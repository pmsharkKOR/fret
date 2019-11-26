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
import React from 'react';
import MathJax from 'react-mathjax2';

const mathJaxScale = 100;
const mathJaxWidth = "container";
const mathJaxAutoLineBreak = true;
const mathJaxOptions = {
    showMathMenu: false,
    CommonHTML: {
        scale: mathJaxScale,
        linebreaks: {
            width: mathJaxWidth,
            automatic: mathJaxAutoLineBreak
        }
    },
    "HTML-CSS": {
        scale: mathJaxScale,
        linebreaks: {
            width: mathJaxWidth,
            automatic: mathJaxAutoLineBreak
        }
    },
    NativeMML: {
        scale: mathJaxScale,
        linebreaks: {
            width: mathJaxWidth,
            automatic: mathJaxAutoLineBreak
        }
    },
    SVG: {
        scale: mathJaxScale,
        linebreaks: {
            width: mathJaxWidth,
            automatic: mathJaxAutoLineBreak
        }
    },
    PreviewHTML: {
        scale: mathJaxScale,
        linebreaks: {
            width: mathJaxWidth,
            automatic: mathJaxAutoLineBreak
        }
    },
}

function FormulaRenderer(props) {
    return (
        <MathJax.Context input='tex' options={mathJaxOptions}>
            <div> 
                <MathJax.Node inline>
                    {props.tex}
                </MathJax.Node>
            </div>
        </MathJax.Context> 
    );
}

export default FormulaRenderer;