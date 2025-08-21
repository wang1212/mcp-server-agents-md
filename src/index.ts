#!/usr/bin/env node
import { MapGenerationServer } from './server';

const server = new MapGenerationServer();
server.runStdio().catch(console.error);
