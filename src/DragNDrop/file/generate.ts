import { arrayExpression } from "@babel/types";

const generateExecute = (elements: string[]) => {

    let resposta: string[] = new Array<string>(elements.length);
  
    for (let i: number = 0; i < elements.length; i++) {

        let json: any = elements[i]

        if(json.computer.type == 'bash' || json.computer.type == null){
            resposta[i] = generateScriptBash(json, i);
        } else {
            resposta[i] = generateScriptPython(json);
        }
    }

    return resposta;
}

function generateScriptBash(componentes: any, indice: number){
    let cpu: string = "cpu=`mpstat 1 1 | grep Average`", mem = "mem=`free | grep Mem`", disk = "disk=`df`", eth01 = "eth01=`cat /proc/net/dev | grep eth0`";
    let script: string = "";
    let variaveisInicio: string = "echo ", variaveisMedicao = "", variaveisMeio = "", variaveisFim = "echo ";

    if (componentes.computer) {
        if (componentes.computer.date) {
          variaveisMeio += "date=`date --rfc-3339=seconds | awk '{print $1}`" + "<br />";
          variaveisFim += "$date ";
          variaveisInicio += "Date ";
        }
        if (componentes.computer.hour) {
          variaveisMeio += "hour=`date --rfc-3339=seconds | awk '{print $2}`" + "<br />";
          variaveisFim += "$hour ";
          variaveisInicio += "Hour ";
        }
        if (componentes.computer.zombie_process_total) {
          variaveisMeio += "zombie_process_total=`ps aux | awk '{if ($8~\"Z\"){print $0}}' | wc -l`" + "<br />";
          variaveisFim += "$zombie_process_total ";
          variaveisInicio += "ZombieProcessTotal ";
        }

    }

    if (componentes.cpu) {

        variaveisMedicao += cpu + "<br />";

        if (!componentes.cpu.user && !componentes.cpu.nice && !componentes.cpu.sys && !componentes.cpu.iowait && !componentes.cpu.irq && !componentes.cpu.soft && !componentes.cpu.steal && !componentes.cpu.guest && !componentes.cpu.gnice && !componentes.cpu.idle) {
            variaveisFim += "$cpu ";
        }

        if (componentes.cpu.user) {
            variaveisMeio += "cpuuser=`echo $cpu | awk '{print $3}'`" + "<br />";
            variaveisFim += "$cpuuser ";
            variaveisInicio += "CPUUser ";
        }

        if (componentes.cpu.nice) {
            variaveisMeio += "cpunice=`echo $cpu | awk '{print $4}'`" + "<br />";
            variaveisFim += "$cpunice ";
            variaveisInicio += "CPUNice ";
        }

        if (componentes.cpu.sys) {
            variaveisMeio += "cpusys=`echo $cpu | awk '{print $5}'`" + "<br />";
            variaveisFim += "$cpusys ";
            variaveisInicio += "CPUSys ";
        }

        if (componentes.cpu.iowait) {
            variaveisMeio += "cpuiowait=`echo $cpu | awk '{print $6}'`" + "<br />";
            variaveisFim += "$cpuiowait ";
            variaveisInicio += "CPUSys ";
        }

        if (componentes.cpu.irq) {
            variaveisMeio += "cpuirq=`echo $cpu | awk '{print $7}'`" + "<br />";
            variaveisFim += "$cpuirq ";
            variaveisInicio += "CPUIrq ";
        }

        if (componentes.cpu.soft) {
            variaveisMeio += "cpusoft=`echo $cpu | awk '{print $8}'`" + "<br />";
            variaveisFim += "$cpusoft ";
            variaveisInicio += "CPUSoft ";
        }

        if (componentes.cpu.steal) {
            variaveisMeio += "cpusteal=`echo $cpu | awk '{print $9}'`" + "<br />";
            variaveisFim += "$cpusteal ";
            variaveisInicio += "cpuSteal ";
        }

        if (componentes.cpu.guest) {
            variaveisMeio += "cpuguest=`echo $cpu | awk '{print $10}'`" + "<br />";
            variaveisFim += "$cpuguest ";
            variaveisInicio += "cpuGuest ";
        }

        if (componentes.cpu.gnice) {
            variaveisMeio += "cpugnice=`echo $cpu | awk '{print $11}'`" + "<br />";
            variaveisFim += "$cpugnice ";
            variaveisInicio += "cpuGnice ";
        }

        if (componentes.cpu.idle) {
            variaveisMeio += "cpuidle=`echo $cpu | awk '{print $12}'`" + "<br />";
            variaveisFim += "$cpuidle ";
            variaveisInicio += "cpuIdle ";
        }
    }

    if (componentes.network) {

        variaveisMedicao += eth01 + "<br />";
        if (!componentes.network.download_kb && !componentes.network.download_packet && !componentes.network.upload_kb) {
            variaveisFim += "$eth01 ";
        }

        if (componentes.network.download_kb) {
            variaveisMeio += "eth0download1=`echo $eth01 | awk '{print $2}'`" + "<br />";
            variaveisFim += "$eth0download1 ";
            variaveisInicio += "NetDownload ";
        }
        if (componentes.network.download_packet) {
            variaveisMeio += "eth0downpacket1=`echo $eth01 | awk '{print $3}'`" + "<br />";
            variaveisFim += "$eth0downpacket1 ";
            variaveisInicio += "NetDownloadPacket ";
        }
        if (componentes.network.upload_kb) {
            variaveisMeio += "eth0upload1=`echo $eth01 | awk '{print $10}'`" + "<br />";
            variaveisFim += "$eth0upload1 ";
            variaveisInicio += "NetUpload ";
        }
        if (componentes.network.upload_kb) {
            variaveisMeio += "eth0uppacket1=`echo $eth01 | awk '{print $11}'`" + "<br />";
            variaveisFim += "$eth0uppacket1 ";
            variaveisInicio += "NetUploadPacket ";
        }
    }

    if (componentes.disk) {

        variaveisMedicao += disk + "<br />";
        if (!componentes.disk.blocks && !componentes.disk.free_kb && !componentes.disk.free_percent && !componentes.disk.used_kb && !componentes.disk.used_percent) {
            variaveisFim += "$disk ";
        }

        if (componentes.disk.blocks) {
            variaveisMeio += "diskblocks=`echo $disk | awk '{print $2}'`" + "<br />";
            variaveisFim += "$diskblocks ";
            variaveisInicio += "Diskblocks ";
        }
        if (componentes.disk.free_kb) {
            variaveisMeio += "diskfreekb=`echo $disk | awk '{print (100-$5)}'`" + "<br />";
            variaveisFim += "$diskfreekb ";
            variaveisInicio += "DiskFreeKB ";
        }
        if (componentes.disk.free_percent) {
            variaveisMeio += "diskfreepercent=`echo $disk | awk '{print $4/$2 * 100.0}'`" + "<br />";
            variaveisFim += "$diskfreepercent ";
            variaveisInicio += "DiskFreePercent ";
        }
        if (componentes.disk.used_kb) {
            variaveisMeio += "diskusedkb=`echo $disk | awk '{print $3}'`" + "<br />";
            variaveisFim += "$diskusedkb ";
            variaveisInicio += "DiskUsedKB ";
        }
        if (componentes.disk.used_percent) {
            variaveisMeio += "diskusedpercent=`echo $disk | awk '{print $5}'`" + "<br />";
            variaveisFim += "$diskusedpercent ";
            variaveisInicio += "DiskUsedPercent ";
        }
    }

    if (componentes.memory) {

        variaveisMedicao += mem + "<br />";
        if (!componentes.memory.total && !componentes.memory.used && !componentes.memory.buff_cache && !componentes.memory.avaliable && !componentes.memory.swap_free && !componentes.memory.swap_total && !componentes.memory.swap_used) {
            variaveisFim += "$mem ";
        }

        if (componentes.memory.total) {
            variaveisMeio += "total_mem=`free | grep Mem | awk '{print $2}'`" + "<br />";
            variaveisFim += "$total_mem ";
            variaveisInicio += "MemTotal ";
        }
        if (componentes.memory.used) {
            variaveisMeio += "used_mem=`free | grep Mem | awk '{print $3}'`" + "<br />";
            variaveisFim += "$used_mem ";
            variaveisInicio += "MemUsed ";
        }
        if (componentes.memory.free) {
            variaveisMeio += "free_mem=`free | grep Mem | awk '{print $4}'`" + "<br />";
            variaveisFim += "$free_mem ";
            variaveisInicio += "MemFree ";
        }
        if (componentes.memory.shared) {
            variaveisMeio += "free_mem=`free | grep Mem | awk '{print $5}'`" + "<br />";
            variaveisFim += "$shared ";
            variaveisInicio += "Shared ";
        }
        if (componentes.memory.buff_cache) {
            variaveisMeio += "buff_cache_mem=`free | grep Mem | awk '{print $6}'`" + "<br />";
            variaveisFim += "$buff_cache_mem ";
            variaveisInicio += "MemBuffCache ";
        }
        if (componentes.memory.available) {
            variaveisMeio += "avaliable_mem=`free | grep Mem | awk '{print $7}'`" + "<br />";
            variaveisFim += "$avaliable_mem ";
            variaveisInicio += "MemAvaliable ";
        }

        if (componentes.memory.swap_free) {
            variaveisMeio += "swap_free_mem=`free | grep Swap | awk '{print $4}'`" + "<br />";
            variaveisFim += "$swap_free_mem ";
            variaveisInicio += "SwapFree ";
        }

        if (componentes.memory.swap_total) {
            variaveisMeio += "swap_total_mem=`free | grep Swap | awk '{print $2}'`" + "<br />";
            variaveisFim += "$swap_total_mem ";
            variaveisInicio += "SwapTotal ";
        }

        if (componentes.memory.swap_used) {
            variaveisMeio += "swap_used_mem=`free | grep Swap | awk '{print $3}'`" + "<br />";
            variaveisFim += "$swap_used_mem ";
            variaveisInicio += "SwapUsed ";
        }
    }

    script += "#!/bin/bash" + "<br />";
    script += variaveisInicio + " > PC" + (indice+1) + ".txt<br />";
    
    if(componentes.cpu != null){
        script += "echo É necessario instalar o pacote mpstat para o monitoramento da cpu. <br />";
    }    
    
    script += "echo Monitorando..." + "<br />";    
    if(componentes.computer.monitoring_frequency != 0){
        script += "num="+componentes.computer.monitoring_frequency+"<br />";
        script += "while [ $num -ge 1 ]<br />do<br />";
    } else {
        script += "while [ True ]<br />do<br />";
    }
      
    script += variaveisMedicao;
    script += variaveisMeio + "<br />";
    script += variaveisFim + ">> PC" + (indice+1) + ".txt<br />";
    if(componentes.computer.monitoring_time != null){
        script += "((num--)) <br />"
        script += "sleep "+ componentes.computer.monitoring_time +"<br />done";
    } else {
        script += "sleep 1<br />done";
    }
      
    return script;
}

function generateScriptPython(componentes: any){
    let script: string = "", variaveis = "", prints = "";

    if (componentes.computer) {
        if (componentes.computer.date) {
            variaveis += "data = datetime.datetime.now()" + "<br />";
            prints += "print(\"Data: \" + x.strftime(\"%d/%m/%y\"))" + "<br />";
        }
        if (componentes.computer.hour) {
            let date: string = !componentes.computer.date ? "data = datetime.datetime.now()" + "<br />" : "";
            variaveis += date + "<br />";
            prints += "    print(\"Hora: \" + x.strftime(\"%H:%M:%S\"))" + "<br />";
        }
        if (componentes.computer.zombie_process_total) {
            variaveis += `    for proc in psutil.process_iter():<br />        try:<br />            if(psutil.ZombieProcess):
                <br />                processName = proc.name()<br />                processID = proc.pid<br />                print(processName , ' ::: ', processID)<br />        except(psutil.NoSuchProcess, psutil.AccessDenied):<br />            pass` + "<br />";;
        }
    }

    if (componentes.cpu) {
        if (componentes.cpu.user) {
            variaveis += "    cpu_user = psutil.cpu_times().user" + "<br />";
            prints += "    print(cpu_user)" + "<br />";
        }

        if (componentes.cpu.sys) {
            variaveis += "    cpu_system = psutil.cpu_times().system" + "<br />";
            prints += "    print(cpu_system)" + "<br />";
        }

        if (componentes.cpu.idle) {
            variaveis += "    cpu_idle = psutil.cpu_times().idle" + "<br />";
            prints += "    print(cpu_idle)" + "<br />";
        }
    }

    if (componentes.network) {
        if (componentes.network.download_kb) {
            variaveis += "    network_download = psutil.net_io_counters().bytes_recv" + "<br />";
            prints += "    print(network_download)" + "<br />";
        }
        if (componentes.network.download_packet) {
            variaveis += "    network_download_packet = psutil.net_io_counters().packets_recv" + "<br />";
            prints += "    print(network_download_packet)" + "<br />";
        }
        if (componentes.network.upload_kb) {
            variaveis += "    network_upload = psutil.net_io_counters().bytes_sent" + "<br />";
            prints += "    print(network_upload)" + "<br />";
        }
        if (componentes.network.upload_kb) {
            variaveis += "    network_upload_packet = psutil.net_io_counters().packets_sent" + "<br />";
            prints += "    print(network_upload_packet)" + "<br />";
        }
    }

    if (componentes.disk) {
        if (componentes.disk.total) {
            variaveis += "    disk_total = psutil.disk_usage(\"/\")[0]" + "<br />";
            prints += "    print(disk_total)" + "<br />";
        }
        if (componentes.disk.free_percent) {
            if(!componentes.disk.total){
                variaveis += "disk_total = psutil.disk_usage(\"/\")[0]" + "<br />";
            }
            variaveis += "    disk_free_percent = psutil.disk_usage(\"/\")[2] * 100 / disk_total" + "<br />";
            prints += "    print(disk_total)" + "<br />";
        }
        if (componentes.disk.used_percent) {
            variaveis += "    disk_used_percent = psutil.disk_usage(\"/\")[3]" + "<br />";
            prints += "    print(disk_used_percent)" + "<br />";
        }
    }

    if (componentes.memory) {
        if (componentes.memory.total) {
            variaveis += "    mem_total = psutil.virtual_memory().total" + "<br />";
            prints += "    print(mem_total)" + "<br />";
        }
        if (componentes.memory.used) {
            variaveis += "    mem_used = psutil.virtual_memory().used" + "<br />";
            prints += "    print(mem_used)" + "<br />";
        }
        if (componentes.memory.free) {
            variaveis += "    mem_free = psutil.virtual_memory().free" + "<br />";
            prints += "    print(mem_free)" + "<br />";
        }
        if (componentes.memory.available) {
            variaveis += "    mem_available= psutil.virtual_memory().available" + "<br />";
            prints += "    print(mem_available)" + "<br />";
        }
        if (componentes.memory.swap_free) {
            variaveis += "    mem_swap_free = psutil.swap_memory().free" + "<br />";
            prints += "    print(mem_swap_free)" + "<br />";
        }
        if (componentes.memory.swap_total) {
            variaveis += "    mem_swap_total = psutil.swap_memory().total" + "<br />";
            prints += "    print(mem_swap_total)" + "<br />";
        }
        if (componentes.memory.swap_used) {
            variaveis += "    mem_swap_used = psutil.swap_memory().used" + "<br />";
            prints += "    print(mem_swap_used)" + "<br />";
        }
    }

    script += "import datetime" + "<br />" + "import psutil" + "<br />";
    script += "#É necessario instalar o pip para instalar o pacote psutil" + "<br />";

    if(componentes.computer.monitoring_time){
        let tempo: number = componentes.computer.monitoring_frequency ? componentes.computer.monitoring_time / componentes.computer.monitoring_frequency : 10;

        script += "tempo = " + tempo + "<br />";
        script += "cont = 0" + "<br />";
        script += "while(cont < tempo):" + "<br />";
        script += "    " + variaveis + "<br />";
        script += "    " + prints + "<br />";
        script += "    sleep(" + tempo + ")" + "<br />";
        script += "    cont += 1" + "<br />";
    } else {
        let tempo: number = componentes.computer.monitoring_frequency ? componentes.computer.monitoring_frequency : 10;

        script += "tempo = " + tempo + "<br />";
        script += "cont = 0" + "<br />";
        script += "while(true):" + "<br />";
        script += "    " + variaveis + "<br />";
        script += "    " + prints + "<br />";
        script += "    sleep(" + tempo + ")" + "<br />";
        script += "    cont += 1" + "<br />";
    }
      
    return script;
}

export default generateExecute;