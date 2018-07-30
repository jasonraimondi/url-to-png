export abstract class BaseController {
  protected errorMessage(err: Error, response) {
    return response.json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
}
