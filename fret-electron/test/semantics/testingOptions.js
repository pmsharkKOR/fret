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
module.exports = Object.freeze({
satisfaction : ['satisfaction'],

TraceLength : 15,
MAX_COMPLETE_EXPLORE : 5,
RESLength : 2,
CondLength : 2,
SCLength : 3,
N_RANGE : 3,

verboseSemanticsTest : false,
reportAllTestCases : false,
// if false: only dump discrepancies
// otherwise dump all test cases (i.e. formulas + traces)
// into files for the LTL-sim tool
//
dumpAllTestCases : false,
printDiscrepancyFiles : false,
outputOnlyDiscrepancies : false,

outputKeyandExpected : false, // Output key and expected for each setting, before the test case banner if that's printed.
optimizeTests : false, // Only test non-metric timings with duration=1 and null condtions with condition intervals length 0

//All allowed command line options. These are used to check whether the user specified options correctly.
toolOptions: ['SMV', 'CoCoSpec', undefined],
rangeOptions: ['simple', 'extended', undefined],
timingOptions: ['nonMetricTiming', 'metricTiming', 'mostTiming', 'fullTiming', undefined],
conditionOptions: ['fullCondition', 'nullCondition', undefined],

runtimeOptions : {
  string : {t: 'tool', r: 'range'},
  object : {i: 'timing', c: 'condition'},
  alias: {h: 'help'},
},

timingSubs : {
  nonMetricTiming:  ['immediately','always','never','eventually'],
  metricTiming: ['within','for','after'],
  mostTiming: ['immediately','always','never','eventually','within', 'for'],
  fullTiming: ['immediately','always','never','eventually','within', 'for', 'after'],
},

conditionSubs : {
  fullCondition: ['null','regular'],
  nullCondition: ['null'],
},

  help: '\nOptions: \n'+
  '\xa0 -h, --help:\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Print usage info\n'+
  '\xa0 -t, --tool:\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Specify tool (SMV or CoCoSpec)\n'+
  '\xa0 -r, --range:\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Specify range (simple or extended)\n'+
  '\xa0 -i, --timing:\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Specify timing (nonMetricTiming or metricTiming or mostTiming or fullTiming)\n'+
  '\xa0 -c, --condition:\xa0\xa0\xa0\xa0 Specify condition (fullCondition or nullCondition)\n'+
  '\nBy default tests will run for SMV, simple, mostTiming and fullCondition.\n',

  incorrectTool: '\nIncorrect option was given for the tool argument. Please see help for additional info.\n',
  incorrectRange: '\nIncorrect option was given for the range argument. Please see help for additional info.\n',
  incorrectTiming: '\nIncorrect option was given for the timing argument. Please see help for additional info.\n',
  incorrectCondition: '\nIncorrect option was given for the condition argument. Please see help for additional info.\n',

});
