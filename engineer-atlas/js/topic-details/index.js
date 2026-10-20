import frontend from './frontend.js';
import database from './database.js';
import backend from './backend.js';
import chatbot from './chatbot.js';
import rag from './rag.js';
import infra from './infra.js';
import foundationsExpansion from './foundations-expansion.js';

export const TOPIC_DETAILS = {
  ...frontend,
  ...database,
  ...backend,
  ...chatbot,
  ...rag,
  ...infra,
  ...foundationsExpansion,
};
