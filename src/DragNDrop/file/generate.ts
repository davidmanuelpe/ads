
const generateExecute = (elements: string[]) => {

  let cpu: string = "cpu =`mpstat 1 1 | grep Average`", mem = "mem=`free | grep Mem`", disk = "disk=`df`", eth01 = "eth01=`cat /proc/net/dev | grep eth0`";

  let resposta: string[] = new Array<string>(elements.length);

  for (let i: number = 0; i < elements.length; i++) {

    let script: string = "";
    let variaveisInicio: string = "echo ", variaveisMedicao = "", variaveisMeio = "", variaveisFim = "echo ";
    let json: any = elements[i]

    if (json.computer) {
      if (json.computer.date) {
        variaveisMeio += "date=`date --rfc-3339=seconds | awk '{print $1}`" + "\n";
        variaveisFim += "$date ";
        variaveisInicio += "Date ";
      }

      if (json.computer.hour) {
        variaveisMeio += "hour=`date --rfc-3339=seconds | awk '{print $2}`" + "\n";
        variaveisFim += "$hour ";
        variaveisInicio += "Hour ";
      }

      if (json.computer.zombie_process_total) {
        variaveisMeio += "zombie_process_total=`ps aux | awk '{if ($8~\"Z\"){print $0}}' | wc -l`" + "\n";
        variaveisFim += "$zombie_process_total ";
        variaveisInicio += "ZombieProcessTotal ";
      }
    }

    if (json.cpu) {

      variaveisMedicao += cpu + "\n";

      if (json.cpu.user) {
        variaveisMeio += "cpuuser=`echo $cpu | awk '{print $3}'`" + "\n";
        variaveisFim += "$cpuuser ";
        variaveisInicio += "CPUUser ";
      }

      if (json.cpu.nice) {
        variaveisMeio += "cpunice=`echo $cpu | awk '{print $4}'`" + "\n";
        variaveisFim += "$cpunice ";
        variaveisInicio += "CPUNice ";
      }

      if (json.cpu.sys) {
        variaveisMeio += "cpusys=`echo $cpu | awk '{print $5}'`" + "\n";
        variaveisFim += "$cpusys ";
        variaveisInicio += "CPUSys ";
      }

      if (json.cpu.iowait) {
        variaveisMeio += "cpuiowait=`echo $cpu | awk '{print $6}'`" + "\n";
        variaveisFim += "$cpuiowait ";
        variaveisInicio += "CPUSys ";
      }

      if (json.cpu.irq) {
        variaveisMeio += "cpuirq=`echo $cpu | awk '{print $7}'`" + "\n";
        variaveisFim += "$cpuirq ";
        variaveisInicio += "CPUIrq ";
      }

      if (json.cpu.soft) {
        variaveisMeio += "cpusoft=`echo $cpu | awk '{print $8}'`" + "\n";
        variaveisFim += "$cpusoft ";
        variaveisInicio += "CPUSoft ";
      }

      if (json.cpu.steal) {
        variaveisMeio += "cpusteal=`echo $cpu | awk '{print $9}'`" + "\n";
        variaveisFim += "$cpusteal ";
        variaveisInicio += "cpuSteal ";
      }

      if (json.cpu.guest) {
        variaveisMeio += "cpuguest=`echo $cpu | awk '{print $10}'`" + "\n";
        variaveisFim += "$cpuguest ";
        variaveisInicio += "cpuGuest ";
      }

      if (json.cpu.gnice) {
        variaveisMeio += "cpugnice=`echo $cpu | awk '{print $11}'`" + "\n";
        variaveisFim += "$cpugnice ";
        variaveisInicio += "cpuGnice ";
      }

      if (json.cpu.idle) {
        variaveisMeio += "cpuidle=`echo $cpu | awk '{print $12}'`" + "\n";
        variaveisFim += "$cpuidle ";
        variaveisInicio += "cpuIdle ";
      }
    }

    if (json.network) {

      variaveisMedicao += eth01 + "\n";

      if (json.network.download_kb) {
        variaveisMeio += "eth0download1=`echo $eth01 | awk '{print $2}'`" + "\n";
        variaveisFim += "$eth0download1 ";
        variaveisInicio += "NetDownload ";
      }
      if (json.network.download_packet) {
        variaveisMeio += "eth0downpacket1=`echo $eth01 | awk '{print $3}'`" + "\n";
        variaveisFim += "$eth0downpacket1 ";
        variaveisInicio += "NetDownloadPacket ";
      }
      if (json.network.upload_kb) {
        variaveisMeio += "eth0upload1=`echo $eth01 | awk '{print $10}'`" + "\n";
        variaveisFim += "$eth0upload1 ";
        variaveisInicio += "NetUpload ";
      }
      if (json.network.upload_kb) {
        variaveisMeio += "eth0uppacket1=`echo $eth01 | awk '{print $11}'`" + "\n";
        variaveisFim += "$eth0uppacket1 ";
        variaveisInicio += "NetUploadPacket ";
      }
    }

    if (json.disk) {

      variaveisMedicao += disk + "\n";

      if (json.disk.blocks) {
        variaveisMeio += "diskblocks=`echo $disk | awk '{print $2}'`" + "\n";
        variaveisFim += "$diskblocks ";
        variaveisInicio += "Diskblocks ";
      }
      if (json.disk.free_kb) {
        variaveisMeio += "diskfreekb=`echo $disk | awk '{print (100-$5)}'`" + "\n";
        variaveisFim += "$diskfreekb ";
        variaveisInicio += "DiskFreeKB ";
      }
      if (json.disk.free_percent) {
        variaveisMeio += "diskfreepercent=`echo $disk | awk '{print $4/$2 * 100.0}'`" + "\n";
        variaveisFim += "$diskfreepercent ";
        variaveisInicio += "DiskFreePercent ";
      }
      if (json.disk.used_kb) {
        variaveisMeio += "diskusedkb=`echo $disk | awk '{print $3}'`" + "\n";
        variaveisFim += "$diskusedkb ";
        variaveisInicio += "DiskUsedKB ";
      }
      if (json.disk.used_percent) {
        variaveisMeio += "diskusedpercent=`echo $disk | awk '{print $5}'`" + "\n";
        variaveisFim += "$diskusedpercent ";
        variaveisInicio += "DiskUsedPercent ";
      }
    }

    if (json.mem) {

      variaveisMedicao += mem + "\n";

      if (json.mem.total) {
        variaveisMeio += "total_mem=`free | grep Mem | awk '{print $2}'`" + "\n";
        variaveisFim += "$total_mem ";
        variaveisInicio += "MemTotal ";
      }
      if (json.mem.used) {
        variaveisMeio += "used_mem=`free | grep Mem | awk '{print $3}'`" + "\n";
        variaveisFim += "$used_mem ";
        variaveisInicio += "MemUsed ";
      }
      if (json.mem.used) {
        variaveisMeio += "free_mem=`free | grep Mem | awk '{print $4}'`" + "\n";
        variaveisFim += "$free_mem ";
        variaveisInicio += "MemFree ";
      }
      if (json.mem.buff_cache) {
        variaveisMeio += "buff_cache_mem=`free | grep Mem | awk '{print $5}'`" + "\n";
        variaveisFim += "$buff_cache_mem ";
        variaveisInicio += "MemBuffCache ";
      }
      if (json.mem.avaliable) {
        variaveisMeio += "avaliable_mem=`free | grep Mem | awk '{print $6}'`" + "\n";
        variaveisFim += "$avaliable_mem ";
        variaveisInicio += "MemAvaliable ";
      }

      if (json.mem.swap_free) {
        variaveisMeio += "swap_free_mem=`free | grep Swap | awk '{print $4}'`" + "\n";
        variaveisFim += "$swap_free_mem ";
        variaveisInicio += "SwapFree ";
      }

      if (json.mem.swap_total) {
        variaveisMeio += "swap_total_mem=`free | grep Swap | awk '{print $2}'`" + "\n";
        variaveisFim += "$swap_total_mem ";
        variaveisInicio += "SwapTotal ";
      }

      if (json.mem.swap_used) {
        variaveisMeio += "swap_used_mem=`free | grep Swap | awk '{print $3}'`" + "\n";
        variaveisFim += "$swap_used_mem ";
        variaveisInicio += "SwapUsed ";
      }
    }

    script += "#!/bin/bash" + "\n";
    script += variaveisInicio + " > PC" + i + ".txt\n";
    script += "echo Monitorando..." + "\n";
    script += "while [True]\ndo\n";
    script += variaveisMedicao + "\n";
    script += variaveisMeio + "\n";
    script += variaveisFim + ">> PC" + i + ".txt\n";
    script += "sleep 1\ndone";

    resposta[i] = script;
  }
  console.log(resposta)
}

export default generateExecute;