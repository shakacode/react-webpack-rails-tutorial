type markedOptions = {gfm: bool}
@module("marked") external marked: (string, markedOptions) => string = "marked"
