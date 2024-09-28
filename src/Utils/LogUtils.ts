/* eslint-disable no-undef */
class LogUtil {
    static i(page: string, message: string = "", what: string = "") {
      console.log(
        "\x1b[44m%s\x1b[0m\x1b[34m%s\x1b[0m",
        "INFO\n",
        `${page} ::: ${what !== "" ? `${what} ::: ` : ""} ${JSON.stringify(
          message,
        )}`,
      );
    }
  
    static w(page: string, message: string = "", what: string = "") {
      console.log(
        "\x1b[43m%s\x1b[0m\x1b[33m%s\x1b[0m",
        "WARN\n",
        `${page} ::: ${what !== "" ? `${what} ::: ` : ""} ${JSON.stringify(
          message,
        )}`,
      );
    }
  
    static e(page: string, message: string = "", what: string = "") {
      console.log(
        "\x1b[41m%s\x1b[0m\x1b[31m%s\x1b[0m",
        "ERROR\n",
        `${page} ::: ${what !== "" ? `${what} ::: ` : ""} ${JSON.stringify(
          message,
        )}`,
      );
    }
  }
  export default LogUtil;