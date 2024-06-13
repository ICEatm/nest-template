import { Injectable, Logger, Inject } from '@nestjs/common';
import DefaultConfig from 'config/default.config';
import { ConfigType } from '@nestjs/config';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Service responsible for logging messages to a file asynchronously.
 */
@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  private readonly appendFileAsync = promisify(fs.appendFile);
  private logsPath: string;

  constructor(
    @Inject(DefaultConfig.KEY)
    private readonly defaultConfig: ConfigType<typeof DefaultConfig>,
  ) {
    this.logsPath = this.defaultConfig.paths.logsPath;
    this.initializeLogsFolder();
  }

  /**
   * Writes a log message to a log file asynchronously.
   * @param message - The log message to be written to the file.
   * @returns A Promise that resolves when the message is successfully written.
   */
  async writeLogToFile(message: string): Promise<void> {
    if (!this.logsPath) {
      this.logger.error('Log file path is not configured');
      return;
    }

    try {
      await this.appendFileAsync(
        path.join(this.logsPath, 'access.log'),
        `${message}\n`,
      );
    } catch (error) {
      this.logger.error(`Error writing log message to file: ${error}`);
    }
  }

  /**
   * Ensures the logs folder exists, creating it if necessary.
   * @returns A Promise that resolves when the logs folder is ensured to exist.
   */
  private async initializeLogsFolder(): Promise<void> {
    try {
      if (!(await this.directoryExists(this.logsPath))) {
        await this.createDirectory(this.logsPath);
        this.logger.log(`Logs folder created at ${this.logsPath}`);
      }
    } catch (error) {
      this.logger.error(`Error creating logs folder: ${error}`);
    }
  }

  /**
   * Checks if a directory exists.
   * @param dirPath - The path of the directory to check.
   * @returns A Promise that resolves to true if the directory exists, false otherwise.
   */
  private directoryExists(dirPath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(dirPath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  /**
   * Creates a directory.
   * @param dirPath - The path of the directory to create.
   * @returns A Promise that resolves when the directory is successfully created.
   */
  private createDirectory(dirPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(dirPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
