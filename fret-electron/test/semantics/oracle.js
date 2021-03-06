// *****************************************************************************
// Notices:
// 
// Copyright � 2019 United States Government as represented by the Administrator
// of the National Aeronautics and Space Administration.  All Rights Reserved.
// 
// Disclaimers
// 
// No Warranty: THE SUBJECT SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY OF
// ANY KIND, EITHER EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED
// TO, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL CONFORM TO SPECIFICATIONS, 
// ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
// OR FREEDOM FROM INFRINGEMENT, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL BE
// ERROR FREE, OR ANY WARRANTY THAT DOCUMENTATION, IF PROVIDED, WILL CONFORM TO
// THE SUBJECT SOFTWARE. THIS AGREEMENT DOES NOT, IN ANY MANNER, CONSTITUTE AN
// ENDORSEMENT BY GOVERNMENT AGENCY OR ANY PRIOR RECIPIENT OF ANY RESULTS,
// RESULTING DESIGNS, HARDWARE, SOFTWARE PRODUCTS OR ANY OTHER APPLICATIONS
// RESULTING FROM USE OF THE SUBJECT SOFTWARE.  FURTHER, GOVERNMENT AGENCY
// DISCLAIMS ALL WARRANTIES AND LIABILITIES REGARDING THIRD-PARTY SOFTWARE, IF
// PRESENT IN THE ORIGINAL SOFTWARE, AND DISTRIBUTES IT ''AS IS.''
// 
// Waiver and Indemnity:  RECIPIENT AGREES TO WAIVE ANY AND ALL CLAIMS AGAINST
// THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS
// ANY PRIOR RECIPIENT.  IF RECIPIENT'S USE OF THE SUBJECT SOFTWARE RESULTS IN
// ANY LIABILITIES, DEMANDS, DAMAGES, EXPENSES OR LOSSES ARISING FROM SUCH USE,
// INCLUDING ANY DAMAGES FROM PRODUCTS BASED ON, OR RESULTING FROM, RECIPIENT'S
// USE OF THE SUBJECT SOFTWARE, RECIPIENT SHALL INDEMNIFY AND HOLD HARMLESS THE
// UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS ANY
// PRIOR RECIPIENT, TO THE EXTENT PERMITTED BY LAW.  RECIPIENT'S SOLE REMEDY FOR
// ANY SUCH MATTER SHALL BE THE IMMEDIATE, UNILATERAL TERMINATION OF THIS
// AGREEMENT.
// *****************************************************************************
const fretSupportPath = "../../support/";
const intervalLogic = require(fretSupportPath + 'intervalLogic');

exports.applyConstraints =
    (scope, condition, timing, response,
     modeIntervals, conditionIntervals, responseIntervals,
     traceInterval, n) => {

  var result = 'undefined';

  // modesArray is the intervals where the timing is checked
  var modesArray = this.activeScopeIntervals(scope,traceInterval,modeIntervals);

  var timingFunction = timing;
  if (condition == 'regular') {
    timingFunction = timingFunction + 'Cond'
    //console.log("************  CHECK THIS OUT **************")
  }

  var resultArray = [];
  // console.log('1. ' + JSON.stringify(modeIntervals))
  // console.log('2. ' + JSON.stringify(modesArray))
  for (let scopeInterval of modesArray) {
    if (condition == 'regular') {
      for (let conditionInterval of conditionIntervals) {
        var trigger = findConditionTrigger(scopeInterval, conditionInterval);
        if (trigger.point >=0) {
          var res = this.checkTimings(n, scope, scopeInterval, trigger, responseIntervals, timingFunction, traceInterval)
          if (res != null) // means it's a dont care
            resultArray.push(res)
        }
    }
  } else {
        res = this.checkTimings(n, scope, scopeInterval, null, responseIntervals, timingFunction, traceInterval)
        if (res != null) // means it's a dont care
          resultArray.push(res)
  }
  }

  //console.log(JSON.stringify(resultArray))
  return resultArray.every((x) => x)
}

exports.checkTimings =  (duration, scope, scopeInterval, trigger, responseIntervals, functionCase, traceInterval) => {

var constraints = 'undefined'
var isNegated = scope.includes('only');

switch (functionCase) {
  case 'immediately': constraints = immediately(scopeInterval, responseIntervals, isNegated); break;
  case 'immediatelyCond': constraints = immediatelyCond(responseIntervals, trigger, isNegated); break;
  case 'always': constraints = always(scopeInterval, responseIntervals, isNegated); break;
  case 'alwaysCond': constraints = alwaysCond(responseIntervals, trigger, isNegated); break;
  case 'eventually': constraints = eventually(scopeInterval, responseIntervals, isNegated); break;
  case 'eventuallyCond': constraints = eventuallyCond(responseIntervals, trigger, isNegated); break;
  case 'never': constraints = never(scopeInterval, responseIntervals, isNegated); break;
  case 'neverCond': constraints = neverCond(responseIntervals, trigger, isNegated); break;
  case 'within': constraints = within(scopeInterval, responseIntervals, duration, isNegated); break;
  case 'withinCond': constraints = withinCond(responseIntervals, trigger, duration, isNegated); break;
  case 'for': constraints = forDuration(scopeInterval, responseIntervals, duration,isNegated); break;
case 'forCond': constraints = forDurationCond(responseIntervals, trigger, duration,isNegated); break;
case 'after': constraints = after(scopeInterval, responseIntervals, duration, traceInterval, isNegated); break;
case 'afterCond': constraints = afterCond(responseIntervals, trigger, duration, traceInterval, isNegated); break;

default: { console.log('!! Unhandled functionCase ' + functionCase + 'in checkTimings');
	   constraints = 'undefined'
	 }
}
return constraints;
}

function consolidate(resultArray){

    if (negate) {return resultArray.every((x) => !x)} else {return resultArray.every((x) => x)}
  }

exports.activeScopeIntervals = (scope, traceInterval, modeIntervals) => {
  var modesArray = [] // This will be returned, an array of intervals where the scope is active

  // define your scope interval
  // currently handling only a single interval where mode is true but still use array
  // in order to handle the 'only's. Extend in future.
  switch (scope) {
    case 'null':
      modesArray.push(traceInterval);
      break;
    // in and onlyIn
    case 'in':
      modesArray = modeIntervals;
      break;
    case 'notin':
    case 'onlyIn':
      // onlyIn uses the scope we calculate for in so as to then take the negation
      modesArray = intervalLogic.minusMultiple([traceInterval], modeIntervals);
      break;
    // before and onlyBefore
    case 'before':
    case 'onlyBefore':
      if (intervalLogic.isEmpty(modeIntervals))
	     modesArray = [traceInterval]; // the whole traceinterval or no interval (i.e., [])?
      else {
        var scopeInterval = intervalLogic.createInterval(traceInterval.left, modeIntervals[0].left-1);
          if (intervalLogic.isWellFormed(scopeInterval))
	      modesArray = [scopeInterval];
	  else modesArray = [];
      }
      if (scope == 'onlyBefore') {
          modesArray = intervalLogic.minusMultiple([traceInterval], modesArray);
      }
      break;
    // after and onlyAfter
    case 'after':
    case 'onlyAfter':
      if (intervalLogic.isEmpty(modeIntervals))
        modesArray = []; // the whole traceinterval or no interval (i.e., [])?
      else {
        const scopeInterval = intervalLogic.createInterval(modeIntervals[0].right+1,
                                                           traceInterval.right);
        if (intervalLogic.isWellFormed(scopeInterval))
	         modesArray = [scopeInterval];
	      else modesArray = [];
      }
      if (scope == 'onlyAfter')
            modesArray = intervalLogic.minusMultiple([traceInterval], modesArray);

      break;
    default: return result;
  }
    // make sure you remove all empty intervals potentially leading to []
    return intervalLogic.removeEmptyIntervals(modesArray);
}

function findConditionTrigger(scopeInterval, conditionInterval) {
  var triggerPoint = -1;
  if (intervalLogic.includesPoint(scopeInterval,conditionInterval.left)) {
    triggerPoint = conditionInterval.left;
  } else if (intervalLogic.includesPoint(conditionInterval,scopeInterval.left)) {
      triggerPoint = scopeInterval.left;
  }

  return {point:triggerPoint, scope:intervalLogic.createInterval(triggerPoint, scopeInterval.right)}
}

// immediately when unconditional
function immediately(scopeInterval, responseIntervals, negate=false) {
  var pos = intervalLogic.includesPointMultiple(responseIntervals, scopeInterval.left)
  return (negate?!pos:pos)
}

// immediately when conditions are around
function immediatelyCond(responseIntervals, trigger, negate=false) {
	return immediately(trigger.scope, responseIntervals, negate)
}



// we need to make sure that sets of intervals are disjoint
function always (scopeInterval, responseIntervals, negate=false) {
	var pos =  (responseIntervals.some((responseInterval) =>
										       intervalLogic.includesW(responseInterval, scopeInterval)))
  return (negate?!pos:pos)

}

function alwaysCond(responseIntervals, trigger, negate=false) {
    return always(trigger.scope, responseIntervals, negate)
}


function eventually (scopeInterval, responseIntervals, negate=false) {
  var pos =  responseIntervals.some((responseInterval) =>
						(!intervalLogic.disjoint(responseInterval, scopeInterval)));
  return (negate?!pos:pos)
	}


function eventuallyCond(responseIntervals, trigger, negate=false) {
	return eventually(trigger.scope, responseIntervals, negate)
}

function never (scopeInterval, responseIntervals, negate=false) {
	var pos =  responseIntervals.every((responseInterval) =>
								  (intervalLogic.disjoint(responseInterval, scopeInterval)));
  return (negate?!pos:pos)
	}

function neverCond(responseIntervals, trigger, negate=false) {
    return never(trigger.scope, responseIntervals, negate)
  }


function within (scopeInterval, responseIntervals, duration, negate=false) {

	    var scopeIntervalTruncated = intervalLogic.createInterval(scopeInterval.left,
								  Math.min(scopeInterval.left+duration, scopeInterval.right));

	    // if it is negate (not within) then we check even if the
	    // interval is shorter than duration - note that the negation
	    // is to happen outside this function

      var pos =  intervalLogic.overlaps(responseIntervals,scopeIntervalTruncated);
	    if (negate || (intervalLogic.length(scopeIntervalTruncated) >= duration)) {
		      return (negate?!pos:pos);
      } else {
        return null // null is dont care
      }
}

// new semantics: when condition value switches from false to true,
// then we expect the response within duration

function withinCond (responseIntervals, trigger, duration, negate=false) {
  return (within(trigger.scope, responseIntervals, duration, negate))
}

function forDuration  (scopeInterval, responseIntervals, duration, negate=false) {

	var scopeIntervalTruncated =
	    intervalLogic.createInterval(scopeInterval.left,
					 Math.min(scopeInterval.left+duration,
						  scopeInterval.right));
	//intervalLogic.print(scopeIntervalTruncated,'scopeIntervalTruncated');
	var pos = intervalLogic.contains(responseIntervals,[scopeIntervalTruncated])
	//console.log('incl = ' + incl);
	if (!negate || (intervalLogic.length(scopeIntervalTruncated) === duration))
	    return (negate?!pos:pos)
  else {
    return null // null is dont care
  }
}

function forDurationCond (responseIntervals, trigger, duration, negate=false) {
      return (forDuration(trigger.scope, responseIntervals, duration, negate))
}

function after (scopeInterval, responseIntervals, duration, traceInterval, negate=false) {
   var p1 = forDuration(scopeInterval, intervalLogic.minusMultiple([traceInterval],responseIntervals), duration, negate)

   if (!negate && (p1 == null)) console.log('\n ***  ERROR - UNEXPECTED CASE')

   var pointAfter = scopeInterval.left + duration + 1
   var p2 = null;
   if (intervalLogic.includesPoint(scopeInterval, pointAfter)) { //otherwise dont care
     p2 = intervalLogic.includesPointMultiple(responseIntervals,pointAfter);
     if (negate) p2 = !p2;
   }

  if (p1 == null) // after will be outside the interval anyway
    return null;
  if (p2 == null) // after is outside the interval
    return (negate?null:p1) // takes care of negations
  else
      return (negate? (p1 || p2) : (p1 && p2))
   }

function afterCond (responseIntervals, trigger, duration, traceInterval, negate=false) {
  return (after(trigger.scope, responseIntervals, duration, traceInterval, negate))
}
