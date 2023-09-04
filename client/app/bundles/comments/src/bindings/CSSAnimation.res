module TransitionGroup = {
  @react.component @module("react-transition-group")
  external make: (
    ~children: React.element,
    ~className: string,
    ~component: string
  ) => React.element = "TransitionGroup"
}

module CSSTransition = {
  type t = {
    enter: string,
    enterActive: string,
    exit: string,
    exitActive: string
  }

  @react.component @module("react-transition-group")
  external make: (
    ~children: React.element, 
    ~key: string, 
    ~timeout: int, 
    ~nodeRef: React.ref<Js.Nullable.t<'a>>, 
    ~classNames: t
  ) => React.element = "CSSTransition"
}
