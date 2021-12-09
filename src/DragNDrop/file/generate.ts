import { arrayExpression } from "@babel/types";

const generateExecute = (elements: string[]) => {
  console.log(elements)

  
  let cpu: string = "cpu=`mpstat 1 1 | grep Average`", mem = "mem=`free | grep Mem`", disk = "disk=`df`", eth01 = "eth01=`cat /proc/net/dev | grep eth0`";

  let resposta: string[] = new Array<string>(elements.length);

  for (let i: number = 0; i < elements.length; i++) {

    let script: string = "";
    let variaveisInicio: string = "echo ", variaveisMedicao = "", variaveisMeio = "", variaveisFim = "echo ";
    let json: any = elements[i]

    if(json.computer.type == 'bash' || json.computer.type == null){
    
    

      if (json.computer) {
        if (json.computer.date) {
          variaveisMeio += "date=`date --rfc-3339=seconds | awk '{print $1}`" + "<br />";
          variaveisFim += "$date ";
          variaveisInicio += "Date ";
        }
        if (json.computer.hour) {
          variaveisMeio += "hour=`date --rfc-3339=seconds | awk '{print $2}`" + "<br />";
          variaveisFim += "$hour ";
          variaveisInicio += "Hour ";
        }
        if (json.computer.zombie_process_total) {
          variaveisMeio += "zombie_process_total=`ps aux | awk '{if ($8~\"Z\"){print $0}}' | wc -l`" + "<br />";
          variaveisFim += "$zombie_process_total ";
          variaveisInicio += "ZombieProcessTotal ";
        }

      }

      if (json.cpu) {

        variaveisMedicao += cpu + "<br />";


        if (!json.cpu.user && !json.cpu.nice && !json.cpu.sys && !json.cpu.iowait && !json.cpu.irq && !json.cpu.soft && !json.cpu.steal && !json.cpu.guest && !json.cpu.gnice && !json.cpu.idle) {
          variaveisFim += "$cpu ";
        }

        if (json.cpu.user) {
          variaveisMeio += "cpuuser=`echo $cpu | awk '{print $3}'`" + "<br />";
          variaveisFim += "$cpuuser ";
          variaveisInicio += "CPUUser ";
        }

        if (json.cpu.nice) {
          variaveisMeio += "cpunice=`echo $cpu | awk '{print $4}'`" + "<br />";
          variaveisFim += "$cpunice ";
          variaveisInicio += "CPUNice ";
        }

        if (json.cpu.sys) {
          variaveisMeio += "cpusys=`echo $cpu | awk '{print $5}'`" + "<br />";
          variaveisFim += "$cpusys ";
          variaveisInicio += "CPUSys ";
        }

        if (json.cpu.iowait) {
          variaveisMeio += "cpuiowait=`echo $cpu | awk '{print $6}'`" + "<br />";
          variaveisFim += "$cpuiowait ";
          variaveisInicio += "CPUSys ";
        }

        if (json.cpu.irq) {
          variaveisMeio += "cpuirq=`echo $cpu | awk '{print $7}'`" + "<br />";
          variaveisFim += "$cpuirq ";
          variaveisInicio += "CPUIrq ";
        }

        if (json.cpu.soft) {
          variaveisMeio += "cpusoft=`echo $cpu | awk '{print $8}'`" + "<br />";
          variaveisFim += "$cpusoft ";
          variaveisInicio += "CPUSoft ";
        }

        if (json.cpu.steal) {
          variaveisMeio += "cpusteal=`echo $cpu | awk '{print $9}'`" + "<br />";
          variaveisFim += "$cpusteal ";
          variaveisInicio += "cpuSteal ";
        }

        if (json.cpu.guest) {
          variaveisMeio += "cpuguest=`echo $cpu | awk '{print $10}'`" + "<br />";
          variaveisFim += "$cpuguest ";
          variaveisInicio += "cpuGuest ";
        }

        if (json.cpu.gnice) {
          variaveisMeio += "cpugnice=`echo $cpu | awk '{print $11}'`" + "<br />";
          variaveisFim += "$cpugnice ";
          variaveisInicio += "cpuGnice ";
        }

        if (json.cpu.idle) {
          variaveisMeio += "cpuidle=`echo $cpu | awk '{print $12}'`" + "<br />";
          variaveisFim += "$cpuidle ";
          variaveisInicio += "cpuIdle ";
        }
      }

      if (json.network) {

        variaveisMedicao += eth01 + "<br />";
        if (!json.network.download_kb && !json.network.download_packet && !json.network.upload_kb) {
          variaveisFim += "$eth01 ";
        }

        if (json.network.download_kb) {
          variaveisMeio += "eth0download1=`echo $eth01 | awk '{print $2}'`" + "<br />";
          variaveisFim += "$eth0download1 ";
          variaveisInicio += "NetDownload ";
        }
        if (json.network.download_packet) {
          variaveisMeio += "eth0downpacket1=`echo $eth01 | awk '{print $3}'`" + "<br />";
          variaveisFim += "$eth0downpacket1 ";
          variaveisInicio += "NetDownloadPacket ";
        }
        if (json.network.upload_kb) {
          variaveisMeio += "eth0upload1=`echo $eth01 | awk '{print $10}'`" + "<br />";
          variaveisFim += "$eth0upload1 ";
          variaveisInicio += "NetUpload ";
        }
        if (json.network.upload_kb) {
          variaveisMeio += "eth0uppacket1=`echo $eth01 | awk '{print $11}'`" + "<br />";
          variaveisFim += "$eth0uppacket1 ";
          variaveisInicio += "NetUploadPacket ";
        }
      }

      if (json.disk) {

        variaveisMedicao += disk + "<br />";
        if (!json.disk.blocks && !json.disk.free_kb && !json.disk.free_percent && !json.disk.used_kb && !json.disk.used_percent) {
          variaveisFim += "$disk ";
        }

        if (json.disk.blocks) {
          variaveisMeio += "diskblocks=`echo $disk | awk '{print $2}'`" + "<br />";
          variaveisFim += "$diskblocks ";
          variaveisInicio += "Diskblocks ";
        }
        if (json.disk.free_kb) {
          variaveisMeio += "diskfreekb=`echo $disk | awk '{print (100-$5)}'`" + "<br />";
          variaveisFim += "$diskfreekb ";
          variaveisInicio += "DiskFreeKB ";
        }
        if (json.disk.free_percent) {
          variaveisMeio += "diskfreepercent=`echo $disk | awk '{print $4/$2 * 100.0}'`" + "<br />";
          variaveisFim += "$diskfreepercent ";
          variaveisInicio += "DiskFreePercent ";
        }
        if (json.disk.used_kb) {
          variaveisMeio += "diskusedkb=`echo $disk | awk '{print $3}'`" + "<br />";
          variaveisFim += "$diskusedkb ";
          variaveisInicio += "DiskUsedKB ";
        }
        if (json.disk.used_percent) {
          variaveisMeio += "diskusedpercent=`echo $disk | awk '{print $5}'`" + "<br />";
          variaveisFim += "$diskusedpercent ";
          variaveisInicio += "DiskUsedPercent ";
        }
      }

      if (json.memory) {

        variaveisMedicao += mem + "<br />";
        if (!json.memory.total && !json.memory.used && !json.memory.buff_cache && !json.memory.avaliable && !json.memory.swap_free && !json.memory.swap_total && !json.memory.swap_used) {
          variaveisFim += "$mem ";
        }

        if (json.memory.total) {
          variaveisMeio += "total_mem=`free | grep Mem | awk '{print $2}'`" + "<br />";
          variaveisFim += "$total_mem ";
          variaveisInicio += "MemTotal ";
        }
        if (json.memory.used) {
          variaveisMeio += "used_mem=`free | grep Mem | awk '{print $3}'`" + "<br />";
          variaveisFim += "$used_mem ";
          variaveisInicio += "MemUsed ";
        }
        if (json.memory.free) {
          variaveisMeio += "free_mem=`free | grep Mem | awk '{print $4}'`" + "<br />";
          variaveisFim += "$free_mem ";
          variaveisInicio += "MemFree ";
        }
        if (json.memory.shared) {
          variaveisMeio += "free_mem=`free | grep Mem | awk '{print $5}'`" + "<br />";
          variaveisFim += "$shared ";
          variaveisInicio += "Shared ";
        }
        if (json.memory.buff_cache) {
          variaveisMeio += "buff_cache_mem=`free | grep Mem | awk '{print $6}'`" + "<br />";
          variaveisFim += "$buff_cache_mem ";
          variaveisInicio += "MemBuffCache ";
        }
        if (json.memory.available) {
          variaveisMeio += "avaliable_mem=`free | grep Mem | awk '{print $7}'`" + "<br />";
          variaveisFim += "$avaliable_mem ";
          variaveisInicio += "MemAvaliable ";
        }

        if (json.memory.swap_free) {
          variaveisMeio += "swap_free_mem=`free | grep Swap | awk '{print $4}'`" + "<br />";
          variaveisFim += "$swap_free_mem ";
          variaveisInicio += "SwapFree ";
        }

        if (json.memory.swap_total) {
          variaveisMeio += "swap_total_mem=`free | grep Swap | awk '{print $2}'`" + "<br />";
          variaveisFim += "$swap_total_mem ";
          variaveisInicio += "SwapTotal ";
        }

        if (json.memory.swap_used) {
          variaveisMeio += "swap_used_mem=`free | grep Swap | awk '{print $3}'`" + "<br />";
          variaveisFim += "$swap_used_mem ";
          variaveisInicio += "SwapUsed ";
        }
      }

      script += "#!/bin/bash" + "<br />";
      script += variaveisInicio + " > PC" + i + ".txt<br />";
      if(json.cpu != null){
        script += "echo É necessario instalar o pacote mpstat para o monitoramento da cpu. <br />";
      }    
      script += "echo Monitorando..." + "<br />";    
      if(json.computer.monitoring_frequency != 0){
        script += "num="+json.computer.monitoring_frequency+"<br />";
        script += "while [ $num -ge 1 ]<br />do<br />";
      } else {
        script += "while [ True ]<br />do<br />";
      }
      script += variaveisMedicao;
      script += variaveisMeio + "<br />";
      script += variaveisFim + ">> PC" + i + ".txt<br />";
      if(json.computer.monitoring_time != null){
        script += "((num--)) <br />"
        script += "sleep "+ json.computer.monitoring_time +"<br />done";
      } else {
        script += "sleep 1<br />done";
      }
      

      resposta[i] = script;
    } else {
      //codigo python
    }
  }
  return resposta
}

export default generateExecute;