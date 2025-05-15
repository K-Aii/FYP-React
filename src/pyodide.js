import { loadPyodide } from "pyodide";

export var Pyodide = (function () {
  var instance;
  function createInstance() {
    var object = new PythonRunner();
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

class PythonRunner {
  constructor() {
    this._output = console.log;
    this._pyodide = null;
    loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.0/full",
      stderr: (text) => {
        this._output(text);
      },
      stdout: (text) => {
        this._output(text);
      },
    }).then((result) => {
      this._pyodide = result;
    });
  }
  setOutput(output) {
    this._output = output;
  }
  run(code) {
    if (this._pyodide) {
      return this._pyodide.runPython(code);
    }
  }
}