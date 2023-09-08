// Generated by ReScript, PLEASE EDIT WITH CARE

import * as $$Comment from "./Comment/Comment.bs.mjs";
import * as AlertError from "./AlertError/AlertError.bs.mjs";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as JsxRuntime from "react/jsx-runtime";
import * as ReactTransitionGroup from "react-transition-group";
import RescriptShowModuleScss from "../RescriptShow.module.scss";

var css = RescriptShowModuleScss;

function CommentList(props) {
  var cssTransitionGroupClassNames_enter = css.elementEnter;
  var cssTransitionGroupClassNames_enterActive = css.elementEnterActive;
  var cssTransitionGroupClassNames_exit = css.elementLeave;
  var cssTransitionGroupClassNames_exitActive = css.elementLeaveActive;
  var cssTransitionGroupClassNames = {
    enter: cssTransitionGroupClassNames_enter,
    enterActive: cssTransitionGroupClassNames_enterActive,
    exit: cssTransitionGroupClassNames_exit,
    exitActive: cssTransitionGroupClassNames_exitActive
  };
  return JsxRuntime.jsxs("div", {
              children: [
                JsxRuntime.jsx(AlertError.make, {
                      cssTransitionGroupClassNames: cssTransitionGroupClassNames,
                      error: props.error
                    }),
                JsxRuntime.jsx(ReactTransitionGroup.TransitionGroup, {
                      children: Belt_Array.map(props.comments, (function (comment) {
                              return JsxRuntime.jsx($$Comment.make, {
                                          comment: comment,
                                          cssTransitionGroupClassNames: cssTransitionGroupClassNames
                                        }, "comment_" + String(comment.id));
                            })),
                      className: "commentList",
                      component: "div"
                    })
              ]
            });
}

var make = CommentList;

export {
  css ,
  make ,
}
/* css Not a pure module */