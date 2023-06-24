import { Injectable } from '@nestjs/common';
import cluster from 'node:cluster';
import os from 'node:os';

@Injectable()
export class AppCluster {
  static cluster(callback: () => void) {
    if (cluster.isPrimary) {
      const CPUS = os.cpus();
      CPUS.forEach(() => cluster.fork());
      cluster.on('listening', (worker) => {
        console.log('Cluster is connected:', worker.process.pid);
      });
      cluster.on('Disconnected', (worker) => {
        console.log('Cluster is disconnected:', worker.process.pid);
      });
      cluster.on('exit', (worker) => {
        console.log('Cluster is dead:', worker.process.pid);
        cluster.fork();
        //Ensure starts of a new cluster if an old one dies
      });
    } else {
      callback();
    }
  }
}
