import React, { useState, DragEvent, MouseEvent, FC } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Edge,
  ElementId,
  Node,
  FlowElement,
  Handle,
  Position,
  NodeProps,
  NodeTypesType,
  Connection,
} from 'react-flow-renderer';

import FormModal from './modals/index'

import computador from '../imagens/computador.jpg';
import cpu from '../imagens/CPU.png';
import disk from '../imagens/Disk.jpg';
import memory from '../imagens/memory.png';
import network from '../imagens/network.png';
import process from '../imagens/Processes.png';


import Sidebar from './Sidebar';

import './dnd.css';

const configs = {
  computer: {
    data: false,
    hour: false,
    memory_buffers: false,
    memory_cache: false,
    memory_free: false,
    memory_shared: false,
    memory_total: false,
    memory_used: false,
    name: 'Computador',
    rsa: false,
    swap_free: false,
    swap_total: false,
    swap_used: false,
    zombie_process_total: false
  },
  cpu: {
    gnice: true,
    guest: false,
    idle: false,
    iowait: false,
    irq: false,
    name: 'CPU',
    nice: false,
    soft: false,
    steal: false,
    sys: false,
    user: false
  },
  network: {
    download_kb: false,
    download_packet: false,
    name: 'Rede',
    upload_kb: false,
    upload_packet: false
  },
  processes: {
    name: 'Processos',
    cpu: false,
    mem: false,
    virtmem: false,
    resmem: false,
  },
  disk: {
    blocks: false,
    comment: 'Disco',
    free_kb: false,
    free_percent: false,
    name: '/dev/sda',
    total: false,
    used_kb: false,
    used_percent: false
  },
  memory: {
    name: 'Memória',
    total: false,
    used: false,
    free: false,
    shared: false,
    buff_and_cache: false,
    available: false,
  }
}


let id = 0;
export const getId = (): ElementId => `node_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>([]);
  const [visible, setVisible] = useState<boolean>(false)
  const [fields, setFields] = useState<any>({})
  const [modalType, setModalType] = useState<string>('')

  const onConnect = (params: Connection | Edge) => {
    const { source, target } = params
    if (!source || !target) {
      return null
    }
    addEdgeInConnections(source, target)
    setElements((els) => addEdge(params, els));
  }
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);
  const onElementClick = (_: MouseEvent, element: FlowElement) => {
    setFields(element.data.payload)
    setModalType(element.type ?? '')
    setVisible(true)
  }

  const addEdgeInConnections = function (source: string, target: string): void | null {
    const computer = getElement(target)
    const component = getElement(source)
    if (!computer || !component) {
      return null
    }
    computer?.data.connections.push({ type: component?.type, id: component.id })
    component?.data.connections.push({ type: computer?.type, id: computer.id })

    setElements((els) => els.map(el => {
      if (el.id === computer.id) {
        el.data.connections = computer.data.connections
      }
      else if (el.id === component.id) {
        el.data.connections = component.data.connections
      }
      return el
    }));
  }

  const getElement = function (id: string | null): Node | null {
    let element: any
    if (id) {
      setElements((es) => {
        element = es.find(e => e.id === id)
        return es
      });
    }

    return element
  }

  const isValidConnection = (connection: Connection) => {
    const { source, target } = connection
    const computer = getElement(target)
    const component = getElement(source)
    console.log(computer)
    if (!computer || !component) {
      return false
    }

    // se o componente já tem conexão
    const hasConnection = component.data.connections.length > 0
    if (hasConnection) {
      return false
    }
    // se o computador já tem um componente daquele tipo
    const computerHastComponent = computer.data.connections.find((cp: any) =>
      cp.type === component.type)
    if (computerHastComponent) {
      return false
    }

    console.log(true)
    return true
  }

  //custom nodes

  const CustomComputer: FC<NodeProps> = () => {
    return (
      <>
        <img alt="computer" src={computador} width="100" height="100" />
        <span>Computer </span>
        <Handle type="target" position={Position.Right} isValidConnection={isValidConnection} />
        </>
    )
  };

  const CustomCpu: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="cpu" src={cpu} width="100" height="100" />
      <br></br>
      CPU
    </>)
  };

  const CustomDisk: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="disk" src={disk} width="100" height="100" />
      <br></br>
      Disk
    </>)
  };

  const CustomMemory: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="memory" src={memory} width="100" height="100" />
      <br></br>
      Memory
    </>)
  };

  const CustomNetwork: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="network" src={network} width="100" height="100" />
      <br></br>
      Network
    </>)
  };

  const CustomProcesses: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="process" src={process} width="100" height="100" />
      Processes
    </>)
  };

  const nodeTypes: NodeTypesType = {
    computer: CustomComputer,
    cpu: CustomCpu,
    disk: CustomDisk,
    memory: CustomMemory,
    network: CustomNetwork,
    processes: CustomProcesses
  };
  const getConfigByType = (type: string): any => {
    if (type === 'computer') {
      return configs.computer
    }
    else if (type === 'cpu') {
      return configs.cpu
    }
    else if (type === 'disk') {
      return configs.disk
    }
    else if (type === 'memory') {
      return configs.memory
    }
    else if (type === 'network') {
      return configs.network
    }
    else if (type === 'processes') {
      return configs.processes
    }
    return []
  }



  /// BUG: adicona dois nós de uma vez
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (reactFlowInstance && type) {
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: {
          connections: [],
          payload: getConfigByType(type)
        }
      };
      console.log(newNode)
      setElements((es) => es.concat(newNode));
    }
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };



  return (
    <div className="dndflow">
      <FormModal
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        type={modalType}
      />
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            className="validationflow"
            selectNodesOnDrag={false}
            onDragOver={onDragOver}
            onNodeDoubleClick={onElementClick}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
