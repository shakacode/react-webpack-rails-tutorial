module TransitionGroup = {
  @react.component @module("react-transition-group")
  external make: (
    ~children: React.element,
    ~className: string,
    ~component: string
  ) => React.element = "TransitionGroup"
}

type cssTransitionGroupClassNamesT = {
  enter: string,
  enterActive: string,
  exit: string,
  exitActive: string
}

module CSSTransition = {
  @react.component @module("react-transition-group")
  external make: (
    ~children: React.element, 
    ~key: string, 
    ~timeout: int, 
    ~nodeRef: React.ref<Js.Nullable.t<'a>>, 
    ~classNames: cssTransitionGroupClassNamesT
  ) => React.element = "CSSTransition"
}
