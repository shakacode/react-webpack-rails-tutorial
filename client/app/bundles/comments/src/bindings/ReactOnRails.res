type rorDefault = {
  authenticityHeaders: unit => {.} 
}
type rorModule = {
  default: rorDefault
}
@module("react-on-rails") external ror: rorModule = "default"
