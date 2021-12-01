import React, { FC } from 'react';
import {
  Handle,
  Position,
  NodeProps,
  NodeTypesType,
  Connection,
} from 'react-flow-renderer';

import computador from '../imagens/computador.jpg';
import cpu from '../imagens/CPU.png';
import disk from '../imagens/Disk.jpg';
import memory from '../imagens/memory.png';
import network from '../imagens/network.png';
import process from '../imagens/Processes.png';

/// usar essa função para mapear se é possivel conectar
//verificar se os componentes estão sem nenhuma outra conexão antes de conectar a um computador
// verificar se é um computador, para permitir a conexão
const isValidConnection = (connection: Connection) => {

  console.log(connection)
  return true
}

export const CustomComputer: FC<NodeProps> = () => {
  return (
    <>
      <img alt="computer" src={computador} width="100" height="100" />
      <span>Computer </span>
      <Handle type="target" position={Position.Right} isValidConnection={isValidConnection} />
      <Handle type="target" position={Position.Left} isValidConnection={isValidConnection} />
      <Handle type="target" position={Position.Bottom} isValidConnection={isValidConnection} />

    </>
  )
};

export const CustomCpu: FC<NodeProps> = ({ type, data }) => {
  return (<>
    <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
    <img alt="cpu" src={cpu} width="100" height="100" />
    <br></br>
    CPU
    <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
  </>)
};

export const CustomDisk: FC<NodeProps> = ({ type, data }) => {
  return (<>
    <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
    <img alt="disk" src={disk} width="100" height="100" />
    <br></br>
    Disk
    <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
  </>)
};

export const CustomMemory: FC<NodeProps> = ({ type, data }) => {
  return (<>
    <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
    <img alt="memory" src={memory} width="100" height="100" />
    <br></br>
    Memory
    <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
  </>)
};

export const CustomNetwork: FC<NodeProps> = ({ type, data }) => {
  return (<>
    <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
    <img alt="network" src={network} width="100" height="100" />
    <br></br>
    Network
    <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
  </>)
};

export const CustomProcesses: FC<NodeProps> = ({ type, data }) => {
  return (<>
    <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
    <img alt="process" src={process} width="100" height="100" />
    Processes
    <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
  </>)
};

export const nodeTypes: NodeTypesType = {
  computer: CustomComputer,
  cpu: CustomCpu,
  disk: CustomDisk,
  memory: CustomMemory,
  network: CustomNetwork,
  processes: CustomProcesses
};