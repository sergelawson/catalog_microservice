import expressApp from "./expressApp";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 1993;

const StartServer = async () => {
  expressApp.listen(PORT, () => {
    logger.info(`Listening on PORT ${PORT}`);
  });

  process.on("uncaughtException", (error) => {
    logger.error(error);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("Server is running");
});
