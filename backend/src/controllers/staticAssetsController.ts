import * as express from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Path,
  Post,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';

@Tags('Public')
@Route('static')
export class StaticAssetsController extends Controller {
  /**
   * Get public assets for Casanet client side.
   */
  @Response(404, 'Page not found')
  @Get('**/*')
  public async getStaticsAssets(): Promise<string> {
    throw new Error('Request never should be here. it is a documentation only route.');
  }
}
