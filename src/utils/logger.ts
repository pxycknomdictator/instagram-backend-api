export class Logger {
  public static yellow(message: string) {
    console.log("\x1b[33m%s\x1b[0m", message);
  }

  public static magenta(message: string) {
    console.log("\x1b[35m%s\x1b[0m", message);
  }

  public static red(message: string) {
    console.log("\x1b[31m%s\x1b[0m", message);
  }
}
