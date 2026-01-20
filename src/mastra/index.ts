import { Mastra } from "@mastra/core";
import { MyPrivateGateway } from '../mastra/gateways/my-private-gateway';
import { routingAgent } from "./agents/routing-agent";

import { weatherAgent } from "./agents/weather-agent";
import { webSearchAgent } from "./agents/websearch-agent";

export const mastra = new Mastra({
    gateways: {
    myGateway: new MyPrivateGateway(),
  },
    agents: { weatherAgent, webSearchAgent, routingAgent }, 
    logger: false,
});