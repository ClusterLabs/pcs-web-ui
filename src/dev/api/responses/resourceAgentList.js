const ok = [
  {
    full_name: "lsb:anamon",
    class_provider: "lsb",
    type: "anamon",
  },
  {
    full_name: "ocf:heartbeat:apache",
    class_provider: "ocf:heartbeat",
    type: "apache",
  },
  {
    full_name: "ocf:heartbeat:aws-vpc-move-ip",
    class_provider: "ocf:heartbeat",
    type: "aws-vpc-move-ip",
  },
  {
    full_name: "ocf:heartbeat:awseip",
    class_provider: "ocf:heartbeat",
    type: "awseip",
  },
  {
    full_name: "ocf:heartbeat:awsvip",
    class_provider: "ocf:heartbeat",
    type: "awsvip",
  },
  {
    full_name: "ocf:heartbeat:azure-lb",
    class_provider: "ocf:heartbeat",
    type: "azure-lb",
  },
  {
    full_name: "ocf:heartbeat:conntrackd",
    class_provider: "ocf:heartbeat",
    type: "conntrackd",
  },
  {
    full_name: "ocf:heartbeat:CTDB",
    class_provider: "ocf:heartbeat",
    type: "CTDB",
  },
  {
    full_name: "ocf:heartbeat:db2",
    class_provider: "ocf:heartbeat",
    type: "db2",
  },
  {
    full_name: "ocf:heartbeat:Delay",
    class_provider: "ocf:heartbeat",
    type: "Delay",
  },
  {
    full_name: "ocf:heartbeat:dhcpd",
    class_provider: "ocf:heartbeat",
    type: "dhcpd",
  },
  {
    full_name: "ocf:heartbeat:docker",
    class_provider: "ocf:heartbeat",
    type: "docker",
  },
  {
    full_name: "ocf:heartbeat:Dummy",
    class_provider: "ocf:heartbeat",
    type: "Dummy",
  },
  {
    full_name: "ocf:heartbeat:ethmonitor",
    class_provider: "ocf:heartbeat",
    type: "ethmonitor",
  },
  {
    full_name: "ocf:heartbeat:exportfs",
    class_provider: "ocf:heartbeat",
    type: "exportfs",
  },
  {
    full_name: "ocf:heartbeat:Filesystem",
    class_provider: "ocf:heartbeat",
    type: "Filesystem",
  },
  {
    full_name: "ocf:heartbeat:galera",
    class_provider: "ocf:heartbeat",
    type: "galera",
  },
  {
    full_name: "ocf:heartbeat:garbd",
    class_provider: "ocf:heartbeat",
    type: "garbd",
  },
  {
    full_name: "ocf:heartbeat:iface-vlan",
    class_provider: "ocf:heartbeat",
    type: "iface-vlan",
  },
  {
    full_name: "ocf:heartbeat:IPaddr",
    class_provider: "ocf:heartbeat",
    type: "IPaddr",
  },
  {
    full_name: "ocf:heartbeat:IPaddr2",
    class_provider: "ocf:heartbeat",
    type: "IPaddr2",
  },
  {
    full_name: "ocf:heartbeat:IPsrcaddr",
    class_provider: "ocf:heartbeat",
    type: "IPsrcaddr",
  },
  {
    full_name: "ocf:heartbeat:iSCSILogicalUnit",
    class_provider: "ocf:heartbeat",
    type: "iSCSILogicalUnit",
  },
  {
    full_name: "ocf:heartbeat:iSCSITarget",
    class_provider: "ocf:heartbeat",
    type: "iSCSITarget",
  },
  {
    full_name: "ocf:heartbeat:LVM-activate",
    class_provider: "ocf:heartbeat",
    type: "LVM-activate",
  },
  {
    full_name: "ocf:heartbeat:lvmlockd",
    class_provider: "ocf:heartbeat",
    type: "lvmlockd",
  },
  {
    full_name: "ocf:heartbeat:MailTo",
    class_provider: "ocf:heartbeat",
    type: "MailTo",
  },
  {
    full_name: "ocf:heartbeat:mysql",
    class_provider: "ocf:heartbeat",
    type: "mysql",
  },
  {
    full_name: "ocf:heartbeat:nagios",
    class_provider: "ocf:heartbeat",
    type: "nagios",
  },
  {
    full_name: "ocf:heartbeat:named",
    class_provider: "ocf:heartbeat",
    type: "named",
  },
  {
    full_name: "ocf:heartbeat:nfsnotify",
    class_provider: "ocf:heartbeat",
    type: "nfsnotify",
  },
  {
    full_name: "ocf:heartbeat:nfsserver",
    class_provider: "ocf:heartbeat",
    type: "nfsserver",
  },
  {
    full_name: "ocf:heartbeat:nginx",
    class_provider: "ocf:heartbeat",
    type: "nginx",
  },
  {
    full_name: "ocf:heartbeat:NodeUtilization",
    class_provider: "ocf:heartbeat",
    type: "NodeUtilization",
  },
  {
    full_name: "ocf:heartbeat:oraasm",
    class_provider: "ocf:heartbeat",
    type: "oraasm",
  },
  {
    full_name: "ocf:heartbeat:oracle",
    class_provider: "ocf:heartbeat",
    type: "oracle",
  },
  {
    full_name: "ocf:heartbeat:oralsnr",
    class_provider: "ocf:heartbeat",
    type: "oralsnr",
  },
  {
    full_name: "ocf:heartbeat:pgsql",
    class_provider: "ocf:heartbeat",
    type: "pgsql",
  },
  {
    full_name: "ocf:heartbeat:podman",
    class_provider: "ocf:heartbeat",
    type: "podman",
  },
  {
    full_name: "ocf:heartbeat:portblock",
    class_provider: "ocf:heartbeat",
    type: "portblock",
  },
  {
    full_name: "ocf:heartbeat:postfix",
    class_provider: "ocf:heartbeat",
    type: "postfix",
  },
  {
    full_name: "ocf:heartbeat:rabbitmq-cluster",
    class_provider: "ocf:heartbeat",
    type: "rabbitmq-cluster",
  },
  {
    full_name: "ocf:heartbeat:redis",
    class_provider: "ocf:heartbeat",
    type: "redis",
  },
  {
    full_name: "ocf:heartbeat:Route",
    class_provider: "ocf:heartbeat",
    type: "Route",
  },
  {
    full_name: "ocf:heartbeat:rsyncd",
    class_provider: "ocf:heartbeat",
    type: "rsyncd",
  },
  {
    full_name: "ocf:heartbeat:SendArp",
    class_provider: "ocf:heartbeat",
    type: "SendArp",
  },
  {
    full_name: "ocf:heartbeat:slapd",
    class_provider: "ocf:heartbeat",
    type: "slapd",
  },
  {
    full_name: "ocf:heartbeat:Squid",
    class_provider: "ocf:heartbeat",
    type: "Squid",
  },
  {
    full_name: "ocf:heartbeat:sybaseASE",
    class_provider: "ocf:heartbeat",
    type: "sybaseASE",
  },
  {
    full_name: "ocf:heartbeat:symlink",
    class_provider: "ocf:heartbeat",
    type: "symlink",
  },
  {
    full_name: "ocf:heartbeat:tomcat",
    class_provider: "ocf:heartbeat",
    type: "tomcat",
  },
  {
    full_name: "ocf:heartbeat:vdo-vol",
    class_provider: "ocf:heartbeat",
    type: "vdo-vol",
  },
  {
    full_name: "ocf:heartbeat:VirtualDomain",
    class_provider: "ocf:heartbeat",
    type: "VirtualDomain",
  },
  {
    full_name: "ocf:heartbeat:Xinetd",
    class_provider: "ocf:heartbeat",
    type: "Xinetd",
  },
  {
    full_name: "ocf:openstack:nova-compute-wait",
    class_provider: "ocf:openstack",
    type: "nova-compute-wait",
  },
  {
    full_name: "ocf:openstack:NovaEvacuate",
    class_provider: "ocf:openstack",
    type: "NovaEvacuate",
  },
  {
    full_name: "ocf:pacemaker:attribute",
    class_provider: "ocf:pacemaker",
    type: "attribute",
  },
  {
    full_name: "ocf:pacemaker:ClusterMon",
    class_provider: "ocf:pacemaker",
    type: "ClusterMon",
  },
  {
    full_name: "ocf:pacemaker:controld",
    class_provider: "ocf:pacemaker",
    type: "controld",
  },
  {
    full_name: "ocf:pacemaker:Dummy",
    class_provider: "ocf:pacemaker",
    type: "Dummy",
  },
  {
    full_name: "ocf:pacemaker:HealthCPU",
    class_provider: "ocf:pacemaker",
    type: "HealthCPU",
  },
  {
    full_name: "ocf:pacemaker:HealthIOWait",
    class_provider: "ocf:pacemaker",
    type: "HealthIOWait",
  },
  {
    full_name: "ocf:pacemaker:HealthSMART",
    class_provider: "ocf:pacemaker",
    type: "HealthSMART",
  },
  {
    full_name: "ocf:pacemaker:ifspeed",
    class_provider: "ocf:pacemaker",
    type: "ifspeed",
  },
  {
    full_name: "ocf:pacemaker:ping",
    class_provider: "ocf:pacemaker",
    type: "ping",
  },
  {
    full_name: "ocf:pacemaker:pingd",
    class_provider: "ocf:pacemaker",
    type: "pingd",
  },
  {
    full_name: "ocf:pacemaker:remote",
    class_provider: "ocf:pacemaker",
    type: "remote",
  },
  {
    full_name: "ocf:pacemaker:Stateful",
    class_provider: "ocf:pacemaker",
    type: "Stateful",
  },
  {
    full_name: "ocf:pacemaker:SysInfo",
    class_provider: "ocf:pacemaker",
    type: "SysInfo",
  },
  {
    full_name: "ocf:pacemaker:SystemHealth",
    class_provider: "ocf:pacemaker",
    type: "SystemHealth",
  },
  {
    full_name: "service:-.mount",
    class_provider: "service",
    type: "-.mount",
  },
  {
    full_name: "service:anamon",
    class_provider: "service",
    type: "anamon",
  },
  {
    full_name: "service:anamon",
    class_provider: "service",
    type: "anamon",
  },
  {
    full_name: "service:arp-ethers",
    class_provider: "service",
    type: "arp-ethers",
  },
  {
    full_name: "service:atd",
    class_provider: "service",
    type: "atd",
  },
  {
    full_name: "service:auditd",
    class_provider: "service",
    type: "auditd",
  },
  {
    full_name: "service:auth-rpcgss-module",
    class_provider: "service",
    type: "auth-rpcgss-module",
  },
  {
    full_name: "service:autofs",
    class_provider: "service",
    type: "autofs",
  },
  {
    full_name: "service:autovt@",
    class_provider: "service",
    type: "autovt@",
  },
  {
    full_name: "service:blk-availability",
    class_provider: "service",
    type: "blk-availability",
  },
  {
    full_name: "service:boot.mount",
    class_provider: "service",
    type: "boot.mount",
  },
  {
    full_name: "service:btimed",
    class_provider: "service",
    type: "btimed",
  },
  {
    full_name: "service:btimed.socket",
    class_provider: "service",
    type: "btimed.socket",
  },
  {
    full_name: "service:chrony-dnssrv@",
    class_provider: "service",
    type: "chrony-dnssrv@",
  },
  {
    full_name: "service:chrony-dnssrv@.timer",
    class_provider: "service",
    type: "chrony-dnssrv@.timer",
  },
  {
    full_name: "service:chrony-wait",
    class_provider: "service",
    type: "chrony-wait",
  },
  {
    full_name: "service:chronyd",
    class_provider: "service",
    type: "chronyd",
  },
  {
    full_name: "service:console-getty",
    class_provider: "service",
    type: "console-getty",
  },
  {
    full_name: "service:container-getty@",
    class_provider: "service",
    type: "container-getty@",
  },
  {
    full_name: "service:corosync",
    class_provider: "service",
    type: "corosync",
  },
  {
    full_name: "service:corosync-notifyd",
    class_provider: "service",
    type: "corosync-notifyd",
  },
  {
    full_name: "service:cpupower",
    class_provider: "service",
    type: "cpupower",
  },
  {
    full_name: "service:crm_mon",
    class_provider: "service",
    type: "crm_mon",
  },
  {
    full_name: "service:crond",
    class_provider: "service",
    type: "crond",
  },
  {
    full_name: "service:cups",
    class_provider: "service",
    type: "cups",
  },
  {
    full_name: "service:cups-browsed",
    class_provider: "service",
    type: "cups-browsed",
  },
  {
    full_name: "service:cups.path",
    class_provider: "service",
    type: "cups.path",
  },
  {
    full_name: "service:cups.socket",
    class_provider: "service",
    type: "cups.socket",
  },
  {
    full_name: "service:dbus",
    class_provider: "service",
    type: "dbus",
  },
  {
    full_name: "service:dbus-org.freedesktop.hostname1",
    class_provider: "service",
    type: "dbus-org.freedesktop.hostname1",
  },
  {
    full_name: "service:dbus-org.freedesktop.locale1",
    class_provider: "service",
    type: "dbus-org.freedesktop.locale1",
  },
  {
    full_name: "service:dbus-org.freedesktop.login1",
    class_provider: "service",
    type: "dbus-org.freedesktop.login1",
  },
  {
    full_name: "service:dbus-org.freedesktop.nm-dispatcher",
    class_provider: "service",
    type: "dbus-org.freedesktop.nm-dispatcher",
  },
  {
    full_name: "service:dbus-org.freedesktop.portable1",
    class_provider: "service",
    type: "dbus-org.freedesktop.portable1",
  },
  {
    full_name: "service:dbus-org.freedesktop.timedate1",
    class_provider: "service",
    type: "dbus-org.freedesktop.timedate1",
  },
  {
    full_name: "service:dbus.socket",
    class_provider: "service",
    type: "dbus.socket",
  },
  {
    full_name: "service:debug-shell",
    class_provider: "service",
    type: "debug-shell",
  },
  {
    full_name: "service:dev-hugepages.mount",
    class_provider: "service",
    type: "dev-hugepages.mount",
  },
  {
    full_name: "service:dev-mqueue.mount",
    class_provider: "service",
    type: "dev-mqueue.mount",
  },
  {
    full_name: "service:dlm",
    class_provider: "service",
    type: "dlm",
  },
  {
    full_name: "service:dm-event",
    class_provider: "service",
    type: "dm-event",
  },
  {
    full_name: "service:dm-event.socket",
    class_provider: "service",
    type: "dm-event.socket",
  },
  {
    full_name: "service:dnf-makecache",
    class_provider: "service",
    type: "dnf-makecache",
  },
  {
    full_name: "service:dnf-makecache.timer",
    class_provider: "service",
    type: "dnf-makecache.timer",
  },
  {
    full_name: "service:dracut-cmdline",
    class_provider: "service",
    type: "dracut-cmdline",
  },
  {
    full_name: "service:dracut-initqueue",
    class_provider: "service",
    type: "dracut-initqueue",
  },
  {
    full_name: "service:dracut-mount",
    class_provider: "service",
    type: "dracut-mount",
  },
  {
    full_name: "service:dracut-pre-mount",
    class_provider: "service",
    type: "dracut-pre-mount",
  },
  {
    full_name: "service:dracut-pre-pivot",
    class_provider: "service",
    type: "dracut-pre-pivot",
  },
  {
    full_name: "service:dracut-pre-trigger",
    class_provider: "service",
    type: "dracut-pre-trigger",
  },
  {
    full_name: "service:dracut-pre-udev",
    class_provider: "service",
    type: "dracut-pre-udev",
  },
  {
    full_name: "service:dracut-shutdown",
    class_provider: "service",
    type: "dracut-shutdown",
  },
  {
    full_name: "service:emergency",
    class_provider: "service",
    type: "emergency",
  },
  {
    full_name: "service:fstrim",
    class_provider: "service",
    type: "fstrim",
  },
  {
    full_name: "service:fstrim.timer",
    class_provider: "service",
    type: "fstrim.timer",
  },
  {
    full_name: "service:geoclue",
    class_provider: "service",
    type: "geoclue",
  },
  {
    full_name: "service:getty@",
    class_provider: "service",
    type: "getty@",
  },
  {
    full_name: "service:grub-boot-indeterminate",
    class_provider: "service",
    type: "grub-boot-indeterminate",
  },
  {
    full_name: "service:gssproxy",
    class_provider: "service",
    type: "gssproxy",
  },
  {
    full_name: "service:halt-local",
    class_provider: "service",
    type: "halt-local",
  },
  {
    full_name: "service:import-state",
    class_provider: "service",
    type: "import-state",
  },
  {
    full_name: "service:initrd-cleanup",
    class_provider: "service",
    type: "initrd-cleanup",
  },
  {
    full_name: "service:initrd-parse-etc",
    class_provider: "service",
    type: "initrd-parse-etc",
  },
  {
    full_name: "service:initrd-switch-root",
    class_provider: "service",
    type: "initrd-switch-root",
  },
  {
    full_name: "service:initrd-udevadm-cleanup-db",
    class_provider: "service",
    type: "initrd-udevadm-cleanup-db",
  },
  {
    full_name: "service:iprdump",
    class_provider: "service",
    type: "iprdump",
  },
  {
    full_name: "service:iprinit",
    class_provider: "service",
    type: "iprinit",
  },
  {
    full_name: "service:iprupdate",
    class_provider: "service",
    type: "iprupdate",
  },
  {
    full_name: "service:irqbalance",
    class_provider: "service",
    type: "irqbalance",
  },
  {
    full_name: "service:iscsi",
    class_provider: "service",
    type: "iscsi",
  },
  {
    full_name: "service:iscsi-onboot",
    class_provider: "service",
    type: "iscsi-onboot",
  },
  {
    full_name: "service:iscsi-shutdown",
    class_provider: "service",
    type: "iscsi-shutdown",
  },
  {
    full_name: "service:iscsid",
    class_provider: "service",
    type: "iscsid",
  },
  {
    full_name: "service:iscsid.socket",
    class_provider: "service",
    type: "iscsid.socket",
  },
  {
    full_name: "service:iscsiuio",
    class_provider: "service",
    type: "iscsiuio",
  },
  {
    full_name: "service:iscsiuio.socket",
    class_provider: "service",
    type: "iscsiuio.socket",
  },
  {
    full_name: "service:kdump",
    class_provider: "service",
    type: "kdump",
  },
  {
    full_name: "service:kmod-static-nodes",
    class_provider: "service",
    type: "kmod-static-nodes",
  },
  {
    full_name: "service:ldconfig",
    class_provider: "service",
    type: "ldconfig",
  },
  {
    full_name: "service:loadmodules",
    class_provider: "service",
    type: "loadmodules",
  },
  {
    full_name: "service:lvm2-lvmpolld",
    class_provider: "service",
    type: "lvm2-lvmpolld",
  },
  {
    full_name: "service:lvm2-lvmpolld.socket",
    class_provider: "service",
    type: "lvm2-lvmpolld.socket",
  },
  {
    full_name: "service:lvm2-monitor",
    class_provider: "service",
    type: "lvm2-monitor",
  },
  {
    full_name: "service:lvm2-pvscan@",
    class_provider: "service",
    type: "lvm2-pvscan@",
  },
  {
    full_name: "service:lvmlockd",
    class_provider: "service",
    type: "lvmlockd",
  },
  {
    full_name: "service:lvmlocks",
    class_provider: "service",
    type: "lvmlocks",
  },
  {
    full_name: "service:man-db-cache-update",
    class_provider: "service",
    type: "man-db-cache-update",
  },
  {
    full_name: "service:messagebus",
    class_provider: "service",
    type: "messagebus",
  },
  {
    full_name: "service:microcode",
    class_provider: "service",
    type: "microcode",
  },
  {
    full_name: "service:mnt-redhat.mount",
    class_provider: "service",
    type: "mnt-redhat.mount",
  },
  {
    full_name: "service:multipathd",
    class_provider: "service",
    type: "multipathd",
  },
  {
    full_name: "service:multipathd.socket",
    class_provider: "service",
    type: "multipathd.socket",
  },
  {
    full_name: "service:NetworkManager",
    class_provider: "service",
    type: "NetworkManager",
  },
  {
    full_name: "service:NetworkManager-dispatcher",
    class_provider: "service",
    type: "NetworkManager-dispatcher",
  },
  {
    full_name: "service:NetworkManager-wait-online",
    class_provider: "service",
    type: "NetworkManager-wait-online",
  },
  {
    full_name: "service:nfs-blkmap",
    class_provider: "service",
    type: "nfs-blkmap",
  },
  {
    full_name: "service:nfs-convert",
    class_provider: "service",
    type: "nfs-convert",
  },
  {
    full_name: "service:nfs-idmapd",
    class_provider: "service",
    type: "nfs-idmapd",
  },
  {
    full_name: "service:nfs-mountd",
    class_provider: "service",
    type: "nfs-mountd",
  },
  {
    full_name: "service:nfs-server",
    class_provider: "service",
    type: "nfs-server",
  },
  {
    full_name: "service:nfs-utils",
    class_provider: "service",
    type: "nfs-utils",
  },
  {
    full_name: "service:nis-domainname",
    class_provider: "service",
    type: "nis-domainname",
  },
  {
    full_name: "service:pacemaker",
    class_provider: "service",
    type: "pacemaker",
  },
  {
    full_name: "service:pcs_snmp_agent",
    class_provider: "service",
    type: "pcs_snmp_agent",
  },
  {
    full_name: "service:pcsd",
    class_provider: "service",
    type: "pcsd",
  },
  {
    full_name: "service:pcsd-ruby",
    class_provider: "service",
    type: "pcsd-ruby",
  },
  {
    full_name: "service:pesign",
    class_provider: "service",
    type: "pesign",
  },
  {
    full_name: "service:plymouth-halt",
    class_provider: "service",
    type: "plymouth-halt",
  },
  {
    full_name: "service:plymouth-kexec",
    class_provider: "service",
    type: "plymouth-kexec",
  },
  {
    full_name: "service:plymouth-poweroff",
    class_provider: "service",
    type: "plymouth-poweroff",
  },
  {
    full_name: "service:plymouth-quit",
    class_provider: "service",
    type: "plymouth-quit",
  },
  {
    full_name: "service:plymouth-quit-wait",
    class_provider: "service",
    type: "plymouth-quit-wait",
  },
  {
    full_name: "service:plymouth-read-write",
    class_provider: "service",
    type: "plymouth-read-write",
  },
  {
    full_name: "service:plymouth-reboot",
    class_provider: "service",
    type: "plymouth-reboot",
  },
  {
    full_name: "service:plymouth-start",
    class_provider: "service",
    type: "plymouth-start",
  },
  {
    full_name: "service:plymouth-switch-root",
    class_provider: "service",
    type: "plymouth-switch-root",
  },
  {
    full_name: "service:pmcd",
    class_provider: "service",
    type: "pmcd",
  },
  {
    full_name: "service:pmie",
    class_provider: "service",
    type: "pmie",
  },
  {
    full_name: "service:pmie_check",
    class_provider: "service",
    type: "pmie_check",
  },
  {
    full_name: "service:pmie_check.timer",
    class_provider: "service",
    type: "pmie_check.timer",
  },
  {
    full_name: "service:pmie_daily",
    class_provider: "service",
    type: "pmie_daily",
  },
  {
    full_name: "service:pmie_daily.timer",
    class_provider: "service",
    type: "pmie_daily.timer",
  },
  {
    full_name: "service:pmlogger",
    class_provider: "service",
    type: "pmlogger",
  },
  {
    full_name: "service:pmlogger_check",
    class_provider: "service",
    type: "pmlogger_check",
  },
  {
    full_name: "service:pmlogger_check.timer",
    class_provider: "service",
    type: "pmlogger_check.timer",
  },
  {
    full_name: "service:pmlogger_daily",
    class_provider: "service",
    type: "pmlogger_daily",
  },
  {
    full_name: "service:pmlogger_daily-poll",
    class_provider: "service",
    type: "pmlogger_daily-poll",
  },
  {
    full_name: "service:pmlogger_daily-poll.timer",
    class_provider: "service",
    type: "pmlogger_daily-poll.timer",
  },
  {
    full_name: "service:pmlogger_daily.timer",
    class_provider: "service",
    type: "pmlogger_daily.timer",
  },
  {
    full_name: "service:pmlogger_daily_report",
    class_provider: "service",
    type: "pmlogger_daily_report",
  },
  {
    full_name: "service:pmlogger_daily_report-poll",
    class_provider: "service",
    type: "pmlogger_daily_report-poll",
  },
  {
    full_name: "service:pmlogger_daily_report-poll.timer",
    class_provider: "service",
    type: "pmlogger_daily_report-poll.timer",
  },
  {
    full_name: "service:pmlogger_daily_report.timer",
    class_provider: "service",
    type: "pmlogger_daily_report.timer",
  },
  {
    full_name: "service:pmproxy",
    class_provider: "service",
    type: "pmproxy",
  },
  {
    full_name: "service:polkit",
    class_provider: "service",
    type: "polkit",
  },
  {
    full_name: "service:postfix",
    class_provider: "service",
    type: "postfix",
  },
  {
    full_name: "service:proc-fs-nfsd.mount",
    class_provider: "service",
    type: "proc-fs-nfsd.mount",
  },
  {
    full_name: "service:proc-sys-fs-binfmt_misc.mount",
    class_provider: "service",
    type: "proc-sys-fs-binfmt_misc.mount",
  },
  {
    full_name: "service:qarshd.socket",
    class_provider: "service",
    type: "qarshd.socket",
  },
  {
    full_name: "service:qarshd@",
    class_provider: "service",
    type: "qarshd@",
  },
  {
    full_name: "service:qemu-guest-agent",
    class_provider: "service",
    type: "qemu-guest-agent",
  },
  {
    full_name: "service:quotaon",
    class_provider: "service",
    type: "quotaon",
  },
  {
    full_name: "service:rc-local",
    class_provider: "service",
    type: "rc-local",
  },
  {
    full_name: "service:rdisc",
    class_provider: "service",
    type: "rdisc",
  },
  {
    full_name: "service:rescue",
    class_provider: "service",
    type: "rescue",
  },
  {
    full_name: "service:restraintd",
    class_provider: "service",
    type: "restraintd",
  },
  {
    full_name: "service:rhnsd",
    class_provider: "service",
    type: "rhnsd",
  },
  {
    full_name: "service:rhsm",
    class_provider: "service",
    type: "rhsm",
  },
  {
    full_name: "service:rhsm-facts",
    class_provider: "service",
    type: "rhsm-facts",
  },
  {
    full_name: "service:rhsmcertd",
    class_provider: "service",
    type: "rhsmcertd",
  },
  {
    full_name: "service:rngd",
    class_provider: "service",
    type: "rngd",
  },
  {
    full_name: "service:rngd-wake-threshold",
    class_provider: "service",
    type: "rngd-wake-threshold",
  },
  {
    full_name: "service:rpc-gssd",
    class_provider: "service",
    type: "rpc-gssd",
  },
  {
    full_name: "service:rpc-statd",
    class_provider: "service",
    type: "rpc-statd",
  },
  {
    full_name: "service:rpc-statd-notify",
    class_provider: "service",
    type: "rpc-statd-notify",
  },
  {
    full_name: "service:rpcbind",
    class_provider: "service",
    type: "rpcbind",
  },
  {
    full_name: "service:rpcbind.socket",
    class_provider: "service",
    type: "rpcbind.socket",
  },
  {
    full_name: "service:rsyslog",
    class_provider: "service",
    type: "rsyslog",
  },
  {
    full_name: "service:sbd",
    class_provider: "service",
    type: "sbd",
  },
  {
    full_name: "service:sbd_remote",
    class_provider: "service",
    type: "sbd_remote",
  },
  {
    full_name: "service:selinux-autorelabel",
    class_provider: "service",
    type: "selinux-autorelabel",
  },
  {
    full_name: "service:selinux-autorelabel-mark",
    class_provider: "service",
    type: "selinux-autorelabel-mark",
  },
  {
    full_name: "service:serial-getty@",
    class_provider: "service",
    type: "serial-getty@",
  },
  {
    full_name: "service:sshd",
    class_provider: "service",
    type: "sshd",
  },
  {
    full_name: "service:sshd-keygen@",
    class_provider: "service",
    type: "sshd-keygen@",
  },
  {
    full_name: "service:sshd.socket",
    class_provider: "service",
    type: "sshd.socket",
  },
  {
    full_name: "service:sshd@",
    class_provider: "service",
    type: "sshd@",
  },
  {
    full_name: "service:sssd",
    class_provider: "service",
    type: "sssd",
  },
  {
    full_name: "service:sssd-autofs",
    class_provider: "service",
    type: "sssd-autofs",
  },
  {
    full_name: "service:sssd-autofs.socket",
    class_provider: "service",
    type: "sssd-autofs.socket",
  },
  {
    full_name: "service:sssd-kcm",
    class_provider: "service",
    type: "sssd-kcm",
  },
  {
    full_name: "service:sssd-kcm.socket",
    class_provider: "service",
    type: "sssd-kcm.socket",
  },
  {
    full_name: "service:sssd-nss",
    class_provider: "service",
    type: "sssd-nss",
  },
  {
    full_name: "service:sssd-nss.socket",
    class_provider: "service",
    type: "sssd-nss.socket",
  },
  {
    full_name: "service:sssd-pac",
    class_provider: "service",
    type: "sssd-pac",
  },
  {
    full_name: "service:sssd-pac.socket",
    class_provider: "service",
    type: "sssd-pac.socket",
  },
  {
    full_name: "service:sssd-pam",
    class_provider: "service",
    type: "sssd-pam",
  },
  {
    full_name: "service:sssd-pam-priv.socket",
    class_provider: "service",
    type: "sssd-pam-priv.socket",
  },
  {
    full_name: "service:sssd-pam.socket",
    class_provider: "service",
    type: "sssd-pam.socket",
  },
  {
    full_name: "service:sssd-ssh",
    class_provider: "service",
    type: "sssd-ssh",
  },
  {
    full_name: "service:sssd-ssh.socket",
    class_provider: "service",
    type: "sssd-ssh.socket",
  },
  {
    full_name: "service:sssd-sudo",
    class_provider: "service",
    type: "sssd-sudo",
  },
  {
    full_name: "service:sssd-sudo.socket",
    class_provider: "service",
    type: "sssd-sudo.socket",
  },
  {
    full_name: "service:sys-fs-fuse-connections.mount",
    class_provider: "service",
    type: "sys-fs-fuse-connections.mount",
  },
  {
    full_name: "service:sys-kernel-config.mount",
    class_provider: "service",
    type: "sys-kernel-config.mount",
  },
  {
    full_name: "service:sys-kernel-debug.mount",
    class_provider: "service",
    type: "sys-kernel-debug.mount",
  },
  {
    full_name: "service:syslog",
    class_provider: "service",
    type: "syslog",
  },
  {
    full_name: "service:syslog.socket",
    class_provider: "service",
    type: "syslog.socket",
  },
  {
    full_name: "service:system-update-cleanup",
    class_provider: "service",
    type: "system-update-cleanup",
  },
  {
    full_name: "service:systemd-ask-password-console",
    class_provider: "service",
    type: "systemd-ask-password-console",
  },
  {
    full_name: "service:systemd-ask-password-console.path",
    class_provider: "service",
    type: "systemd-ask-password-console.path",
  },
  {
    full_name: "service:systemd-ask-password-plymouth",
    class_provider: "service",
    type: "systemd-ask-password-plymouth",
  },
  {
    full_name: "service:systemd-ask-password-plymouth.path",
    class_provider: "service",
    type: "systemd-ask-password-plymouth.path",
  },
  {
    full_name: "service:systemd-ask-password-wall",
    class_provider: "service",
    type: "systemd-ask-password-wall",
  },
  {
    full_name: "service:systemd-ask-password-wall.path",
    class_provider: "service",
    type: "systemd-ask-password-wall.path",
  },
  {
    full_name: "service:systemd-backlight@",
    class_provider: "service",
    type: "systemd-backlight@",
  },
  {
    full_name: "service:systemd-binfmt",
    class_provider: "service",
    type: "systemd-binfmt",
  },
  {
    full_name: "service:systemd-coredump.socket",
    class_provider: "service",
    type: "systemd-coredump.socket",
  },
  {
    full_name: "service:systemd-coredump@",
    class_provider: "service",
    type: "systemd-coredump@",
  },
  {
    full_name: "service:systemd-exit",
    class_provider: "service",
    type: "systemd-exit",
  },
  {
    full_name: "service:systemd-firstboot",
    class_provider: "service",
    type: "systemd-firstboot",
  },
  {
    full_name: "service:systemd-fsck-root",
    class_provider: "service",
    type: "systemd-fsck-root",
  },
  {
    full_name: "service:systemd-fsck@",
    class_provider: "service",
    type: "systemd-fsck@",
  },
  {
    full_name: "service:systemd-halt",
    class_provider: "service",
    type: "systemd-halt",
  },
  {
    full_name: "service:systemd-hibernate",
    class_provider: "service",
    type: "systemd-hibernate",
  },
  {
    full_name: "service:systemd-hibernate-resume@",
    class_provider: "service",
    type: "systemd-hibernate-resume@",
  },
  {
    full_name: "service:systemd-hostnamed",
    class_provider: "service",
    type: "systemd-hostnamed",
  },
  {
    full_name: "service:systemd-hwdb-update",
    class_provider: "service",
    type: "systemd-hwdb-update",
  },
  {
    full_name: "service:systemd-hybrid-sleep",
    class_provider: "service",
    type: "systemd-hybrid-sleep",
  },
  {
    full_name: "service:systemd-initctl",
    class_provider: "service",
    type: "systemd-initctl",
  },
  {
    full_name: "service:systemd-initctl.socket",
    class_provider: "service",
    type: "systemd-initctl.socket",
  },
  {
    full_name: "service:systemd-journal-catalog-update",
    class_provider: "service",
    type: "systemd-journal-catalog-update",
  },
  {
    full_name: "service:systemd-journal-flush",
    class_provider: "service",
    type: "systemd-journal-flush",
  },
  {
    full_name: "service:systemd-journald",
    class_provider: "service",
    type: "systemd-journald",
  },
  {
    full_name: "service:systemd-journald-audit.socket",
    class_provider: "service",
    type: "systemd-journald-audit.socket",
  },
  {
    full_name: "service:systemd-journald-dev-log.socket",
    class_provider: "service",
    type: "systemd-journald-dev-log.socket",
  },
  {
    full_name: "service:systemd-journald.socket",
    class_provider: "service",
    type: "systemd-journald.socket",
  },
  {
    full_name: "service:systemd-kexec",
    class_provider: "service",
    type: "systemd-kexec",
  },
  {
    full_name: "service:systemd-localed",
    class_provider: "service",
    type: "systemd-localed",
  },
  {
    full_name: "service:systemd-logind",
    class_provider: "service",
    type: "systemd-logind",
  },
  {
    full_name: "service:systemd-machine-id-commit",
    class_provider: "service",
    type: "systemd-machine-id-commit",
  },
  {
    full_name: "service:systemd-modules-load",
    class_provider: "service",
    type: "systemd-modules-load",
  },
  {
    full_name: "service:systemd-portabled",
    class_provider: "service",
    type: "systemd-portabled",
  },
  {
    full_name: "service:systemd-poweroff",
    class_provider: "service",
    type: "systemd-poweroff",
  },
  {
    full_name: "service:systemd-quotacheck",
    class_provider: "service",
    type: "systemd-quotacheck",
  },
  {
    full_name: "service:systemd-random-seed",
    class_provider: "service",
    type: "systemd-random-seed",
  },
  {
    full_name: "service:systemd-reboot",
    class_provider: "service",
    type: "systemd-reboot",
  },
  {
    full_name: "service:systemd-remount-fs",
    class_provider: "service",
    type: "systemd-remount-fs",
  },
  {
    full_name: "service:systemd-resolved",
    class_provider: "service",
    type: "systemd-resolved",
  },
  {
    full_name: "service:systemd-rfkill",
    class_provider: "service",
    type: "systemd-rfkill",
  },
  {
    full_name: "service:systemd-rfkill.socket",
    class_provider: "service",
    type: "systemd-rfkill.socket",
  },
  {
    full_name: "service:systemd-suspend",
    class_provider: "service",
    type: "systemd-suspend",
  },
  {
    full_name: "service:systemd-suspend-then-hibernate",
    class_provider: "service",
    type: "systemd-suspend-then-hibernate",
  },
  {
    full_name: "service:systemd-sysctl",
    class_provider: "service",
    type: "systemd-sysctl",
  },
  {
    full_name: "service:systemd-sysusers",
    class_provider: "service",
    type: "systemd-sysusers",
  },
  {
    full_name: "service:systemd-timedated",
    class_provider: "service",
    type: "systemd-timedated",
  },
  {
    full_name: "service:systemd-tmpfiles-clean",
    class_provider: "service",
    type: "systemd-tmpfiles-clean",
  },
  {
    full_name: "service:systemd-tmpfiles-clean.timer",
    class_provider: "service",
    type: "systemd-tmpfiles-clean.timer",
  },
  {
    full_name: "service:systemd-tmpfiles-setup",
    class_provider: "service",
    type: "systemd-tmpfiles-setup",
  },
  {
    full_name: "service:systemd-tmpfiles-setup-dev",
    class_provider: "service",
    type: "systemd-tmpfiles-setup-dev",
  },
  {
    full_name: "service:systemd-udev-settle",
    class_provider: "service",
    type: "systemd-udev-settle",
  },
  {
    full_name: "service:systemd-udev-trigger",
    class_provider: "service",
    type: "systemd-udev-trigger",
  },
  {
    full_name: "service:systemd-udevd",
    class_provider: "service",
    type: "systemd-udevd",
  },
  {
    full_name: "service:systemd-udevd-control.socket",
    class_provider: "service",
    type: "systemd-udevd-control.socket",
  },
  {
    full_name: "service:systemd-udevd-kernel.socket",
    class_provider: "service",
    type: "systemd-udevd-kernel.socket",
  },
  {
    full_name: "service:systemd-update-done",
    class_provider: "service",
    type: "systemd-update-done",
  },
  {
    full_name: "service:systemd-update-utmp",
    class_provider: "service",
    type: "systemd-update-utmp",
  },
  {
    full_name: "service:systemd-update-utmp-runlevel",
    class_provider: "service",
    type: "systemd-update-utmp-runlevel",
  },
  {
    full_name: "service:systemd-user-sessions",
    class_provider: "service",
    type: "systemd-user-sessions",
  },
  {
    full_name: "service:systemd-vconsole-setup",
    class_provider: "service",
    type: "systemd-vconsole-setup",
  },
  {
    full_name: "service:systemd-volatile-root",
    class_provider: "service",
    type: "systemd-volatile-root",
  },
  {
    full_name: "service:teamd@",
    class_provider: "service",
    type: "teamd@",
  },
  {
    full_name: "service:timedatex",
    class_provider: "service",
    type: "timedatex",
  },
  {
    full_name: "service:tmp.mount",
    class_provider: "service",
    type: "tmp.mount",
  },
  {
    full_name: "service:tuned",
    class_provider: "service",
    type: "tuned",
  },
  {
    full_name: "service:unbound-anchor",
    class_provider: "service",
    type: "unbound-anchor",
  },
  {
    full_name: "service:unbound-anchor.timer",
    class_provider: "service",
    type: "unbound-anchor.timer",
  },
  {
    full_name: "service:user-runtime-dir@",
    class_provider: "service",
    type: "user-runtime-dir@",
  },
  {
    full_name: "service:user@",
    class_provider: "service",
    type: "user@",
  },
  {
    full_name: "service:var-lib-nfs-rpc_pipefs.mount",
    class_provider: "service",
    type: "var-lib-nfs-rpc_pipefs.mount",
  },
  {
    full_name: "service:vdo",
    class_provider: "service",
    type: "vdo",
  },
  {
    full_name: "systemd:-.mount",
    class_provider: "systemd",
    type: "-.mount",
  },
  {
    full_name: "systemd:anamon",
    class_provider: "systemd",
    type: "anamon",
  },
  {
    full_name: "systemd:arp-ethers",
    class_provider: "systemd",
    type: "arp-ethers",
  },
  {
    full_name: "systemd:atd",
    class_provider: "systemd",
    type: "atd",
  },
  {
    full_name: "systemd:auditd",
    class_provider: "systemd",
    type: "auditd",
  },
  {
    full_name: "systemd:auth-rpcgss-module",
    class_provider: "systemd",
    type: "auth-rpcgss-module",
  },
  {
    full_name: "systemd:autofs",
    class_provider: "systemd",
    type: "autofs",
  },
  {
    full_name: "systemd:autovt@",
    class_provider: "systemd",
    type: "autovt@",
  },
  {
    full_name: "systemd:blk-availability",
    class_provider: "systemd",
    type: "blk-availability",
  },
  {
    full_name: "systemd:boot.mount",
    class_provider: "systemd",
    type: "boot.mount",
  },
  {
    full_name: "systemd:btimed",
    class_provider: "systemd",
    type: "btimed",
  },
  {
    full_name: "systemd:btimed.socket",
    class_provider: "systemd",
    type: "btimed.socket",
  },
  {
    full_name: "systemd:chrony-dnssrv@",
    class_provider: "systemd",
    type: "chrony-dnssrv@",
  },
  {
    full_name: "systemd:chrony-dnssrv@.timer",
    class_provider: "systemd",
    type: "chrony-dnssrv@.timer",
  },
  {
    full_name: "systemd:chrony-wait",
    class_provider: "systemd",
    type: "chrony-wait",
  },
  {
    full_name: "systemd:chronyd",
    class_provider: "systemd",
    type: "chronyd",
  },
  {
    full_name: "systemd:console-getty",
    class_provider: "systemd",
    type: "console-getty",
  },
  {
    full_name: "systemd:container-getty@",
    class_provider: "systemd",
    type: "container-getty@",
  },
  {
    full_name: "systemd:corosync",
    class_provider: "systemd",
    type: "corosync",
  },
  {
    full_name: "systemd:corosync-notifyd",
    class_provider: "systemd",
    type: "corosync-notifyd",
  },
  {
    full_name: "systemd:cpupower",
    class_provider: "systemd",
    type: "cpupower",
  },
  {
    full_name: "systemd:crm_mon",
    class_provider: "systemd",
    type: "crm_mon",
  },
  {
    full_name: "systemd:crond",
    class_provider: "systemd",
    type: "crond",
  },
  {
    full_name: "systemd:cups",
    class_provider: "systemd",
    type: "cups",
  },
  {
    full_name: "systemd:cups-browsed",
    class_provider: "systemd",
    type: "cups-browsed",
  },
  {
    full_name: "systemd:cups.path",
    class_provider: "systemd",
    type: "cups.path",
  },
  {
    full_name: "systemd:cups.socket",
    class_provider: "systemd",
    type: "cups.socket",
  },
  {
    full_name: "systemd:dbus",
    class_provider: "systemd",
    type: "dbus",
  },
  {
    full_name: "systemd:dbus-org.freedesktop.hostname1",
    class_provider: "systemd",
    type: "dbus-org.freedesktop.hostname1",
  },
  {
    full_name: "systemd:dbus-org.freedesktop.locale1",
    class_provider: "systemd",
    type: "dbus-org.freedesktop.locale1",
  },
  {
    full_name: "systemd:dbus-org.freedesktop.login1",
    class_provider: "systemd",
    type: "dbus-org.freedesktop.login1",
  },
  {
    full_name: "systemd:dbus-org.freedesktop.nm-dispatcher",
    class_provider: "systemd",
    type: "dbus-org.freedesktop.nm-dispatcher",
  },
  {
    full_name: "systemd:dbus-org.freedesktop.portable1",
    class_provider: "systemd",
    type: "dbus-org.freedesktop.portable1",
  },
  {
    full_name: "systemd:dbus-org.freedesktop.timedate1",
    class_provider: "systemd",
    type: "dbus-org.freedesktop.timedate1",
  },
  {
    full_name: "systemd:dbus.socket",
    class_provider: "systemd",
    type: "dbus.socket",
  },
  {
    full_name: "systemd:debug-shell",
    class_provider: "systemd",
    type: "debug-shell",
  },
  {
    full_name: "systemd:dev-hugepages.mount",
    class_provider: "systemd",
    type: "dev-hugepages.mount",
  },
  {
    full_name: "systemd:dev-mqueue.mount",
    class_provider: "systemd",
    type: "dev-mqueue.mount",
  },
  {
    full_name: "systemd:dlm",
    class_provider: "systemd",
    type: "dlm",
  },
  {
    full_name: "systemd:dm-event",
    class_provider: "systemd",
    type: "dm-event",
  },
  {
    full_name: "systemd:dm-event.socket",
    class_provider: "systemd",
    type: "dm-event.socket",
  },
  {
    full_name: "systemd:dnf-makecache",
    class_provider: "systemd",
    type: "dnf-makecache",
  },
  {
    full_name: "systemd:dnf-makecache.timer",
    class_provider: "systemd",
    type: "dnf-makecache.timer",
  },
  {
    full_name: "systemd:dracut-cmdline",
    class_provider: "systemd",
    type: "dracut-cmdline",
  },
  {
    full_name: "systemd:dracut-initqueue",
    class_provider: "systemd",
    type: "dracut-initqueue",
  },
  {
    full_name: "systemd:dracut-mount",
    class_provider: "systemd",
    type: "dracut-mount",
  },
  {
    full_name: "systemd:dracut-pre-mount",
    class_provider: "systemd",
    type: "dracut-pre-mount",
  },
  {
    full_name: "systemd:dracut-pre-pivot",
    class_provider: "systemd",
    type: "dracut-pre-pivot",
  },
  {
    full_name: "systemd:dracut-pre-trigger",
    class_provider: "systemd",
    type: "dracut-pre-trigger",
  },
  {
    full_name: "systemd:dracut-pre-udev",
    class_provider: "systemd",
    type: "dracut-pre-udev",
  },
  {
    full_name: "systemd:dracut-shutdown",
    class_provider: "systemd",
    type: "dracut-shutdown",
  },
  {
    full_name: "systemd:emergency",
    class_provider: "systemd",
    type: "emergency",
  },
  {
    full_name: "systemd:fstrim",
    class_provider: "systemd",
    type: "fstrim",
  },
  {
    full_name: "systemd:fstrim.timer",
    class_provider: "systemd",
    type: "fstrim.timer",
  },
  {
    full_name: "systemd:geoclue",
    class_provider: "systemd",
    type: "geoclue",
  },
  {
    full_name: "systemd:getty@",
    class_provider: "systemd",
    type: "getty@",
  },
  {
    full_name: "systemd:grub-boot-indeterminate",
    class_provider: "systemd",
    type: "grub-boot-indeterminate",
  },
  {
    full_name: "systemd:gssproxy",
    class_provider: "systemd",
    type: "gssproxy",
  },
  {
    full_name: "systemd:halt-local",
    class_provider: "systemd",
    type: "halt-local",
  },
  {
    full_name: "systemd:import-state",
    class_provider: "systemd",
    type: "import-state",
  },
  {
    full_name: "systemd:initrd-cleanup",
    class_provider: "systemd",
    type: "initrd-cleanup",
  },
  {
    full_name: "systemd:initrd-parse-etc",
    class_provider: "systemd",
    type: "initrd-parse-etc",
  },
  {
    full_name: "systemd:initrd-switch-root",
    class_provider: "systemd",
    type: "initrd-switch-root",
  },
  {
    full_name: "systemd:initrd-udevadm-cleanup-db",
    class_provider: "systemd",
    type: "initrd-udevadm-cleanup-db",
  },
  {
    full_name: "systemd:iprdump",
    class_provider: "systemd",
    type: "iprdump",
  },
  {
    full_name: "systemd:iprinit",
    class_provider: "systemd",
    type: "iprinit",
  },
  {
    full_name: "systemd:iprupdate",
    class_provider: "systemd",
    type: "iprupdate",
  },
  {
    full_name: "systemd:irqbalance",
    class_provider: "systemd",
    type: "irqbalance",
  },
  {
    full_name: "systemd:iscsi",
    class_provider: "systemd",
    type: "iscsi",
  },
  {
    full_name: "systemd:iscsi-onboot",
    class_provider: "systemd",
    type: "iscsi-onboot",
  },
  {
    full_name: "systemd:iscsi-shutdown",
    class_provider: "systemd",
    type: "iscsi-shutdown",
  },
  {
    full_name: "systemd:iscsid",
    class_provider: "systemd",
    type: "iscsid",
  },
  {
    full_name: "systemd:iscsid.socket",
    class_provider: "systemd",
    type: "iscsid.socket",
  },
  {
    full_name: "systemd:iscsiuio",
    class_provider: "systemd",
    type: "iscsiuio",
  },
  {
    full_name: "systemd:iscsiuio.socket",
    class_provider: "systemd",
    type: "iscsiuio.socket",
  },
  {
    full_name: "systemd:kdump",
    class_provider: "systemd",
    type: "kdump",
  },
  {
    full_name: "systemd:kmod-static-nodes",
    class_provider: "systemd",
    type: "kmod-static-nodes",
  },
  {
    full_name: "systemd:ldconfig",
    class_provider: "systemd",
    type: "ldconfig",
  },
  {
    full_name: "systemd:loadmodules",
    class_provider: "systemd",
    type: "loadmodules",
  },
  {
    full_name: "systemd:lvm2-lvmpolld",
    class_provider: "systemd",
    type: "lvm2-lvmpolld",
  },
  {
    full_name: "systemd:lvm2-lvmpolld.socket",
    class_provider: "systemd",
    type: "lvm2-lvmpolld.socket",
  },
  {
    full_name: "systemd:lvm2-monitor",
    class_provider: "systemd",
    type: "lvm2-monitor",
  },
  {
    full_name: "systemd:lvm2-pvscan@",
    class_provider: "systemd",
    type: "lvm2-pvscan@",
  },
  {
    full_name: "systemd:lvmlockd",
    class_provider: "systemd",
    type: "lvmlockd",
  },
  {
    full_name: "systemd:lvmlocks",
    class_provider: "systemd",
    type: "lvmlocks",
  },
  {
    full_name: "systemd:man-db-cache-update",
    class_provider: "systemd",
    type: "man-db-cache-update",
  },
  {
    full_name: "systemd:messagebus",
    class_provider: "systemd",
    type: "messagebus",
  },
  {
    full_name: "systemd:microcode",
    class_provider: "systemd",
    type: "microcode",
  },
  {
    full_name: "systemd:mnt-redhat.mount",
    class_provider: "systemd",
    type: "mnt-redhat.mount",
  },
  {
    full_name: "systemd:multipathd",
    class_provider: "systemd",
    type: "multipathd",
  },
  {
    full_name: "systemd:multipathd.socket",
    class_provider: "systemd",
    type: "multipathd.socket",
  },
  {
    full_name: "systemd:NetworkManager",
    class_provider: "systemd",
    type: "NetworkManager",
  },
  {
    full_name: "systemd:NetworkManager-dispatcher",
    class_provider: "systemd",
    type: "NetworkManager-dispatcher",
  },
  {
    full_name: "systemd:NetworkManager-wait-online",
    class_provider: "systemd",
    type: "NetworkManager-wait-online",
  },
  {
    full_name: "systemd:nfs-blkmap",
    class_provider: "systemd",
    type: "nfs-blkmap",
  },
  {
    full_name: "systemd:nfs-convert",
    class_provider: "systemd",
    type: "nfs-convert",
  },
  {
    full_name: "systemd:nfs-idmapd",
    class_provider: "systemd",
    type: "nfs-idmapd",
  },
  {
    full_name: "systemd:nfs-mountd",
    class_provider: "systemd",
    type: "nfs-mountd",
  },
  {
    full_name: "systemd:nfs-server",
    class_provider: "systemd",
    type: "nfs-server",
  },
  {
    full_name: "systemd:nfs-utils",
    class_provider: "systemd",
    type: "nfs-utils",
  },
  {
    full_name: "systemd:nis-domainname",
    class_provider: "systemd",
    type: "nis-domainname",
  },
  {
    full_name: "systemd:pacemaker",
    class_provider: "systemd",
    type: "pacemaker",
  },
  {
    full_name: "systemd:pcs_snmp_agent",
    class_provider: "systemd",
    type: "pcs_snmp_agent",
  },
  {
    full_name: "systemd:pcsd",
    class_provider: "systemd",
    type: "pcsd",
  },
  {
    full_name: "systemd:pcsd-ruby",
    class_provider: "systemd",
    type: "pcsd-ruby",
  },
  {
    full_name: "systemd:pesign",
    class_provider: "systemd",
    type: "pesign",
  },
  {
    full_name: "systemd:plymouth-halt",
    class_provider: "systemd",
    type: "plymouth-halt",
  },
  {
    full_name: "systemd:plymouth-kexec",
    class_provider: "systemd",
    type: "plymouth-kexec",
  },
  {
    full_name: "systemd:plymouth-poweroff",
    class_provider: "systemd",
    type: "plymouth-poweroff",
  },
  {
    full_name: "systemd:plymouth-quit",
    class_provider: "systemd",
    type: "plymouth-quit",
  },
  {
    full_name: "systemd:plymouth-quit-wait",
    class_provider: "systemd",
    type: "plymouth-quit-wait",
  },
  {
    full_name: "systemd:plymouth-read-write",
    class_provider: "systemd",
    type: "plymouth-read-write",
  },
  {
    full_name: "systemd:plymouth-reboot",
    class_provider: "systemd",
    type: "plymouth-reboot",
  },
  {
    full_name: "systemd:plymouth-start",
    class_provider: "systemd",
    type: "plymouth-start",
  },
  {
    full_name: "systemd:plymouth-switch-root",
    class_provider: "systemd",
    type: "plymouth-switch-root",
  },
  {
    full_name: "systemd:pmcd",
    class_provider: "systemd",
    type: "pmcd",
  },
  {
    full_name: "systemd:pmie",
    class_provider: "systemd",
    type: "pmie",
  },
  {
    full_name: "systemd:pmie_check",
    class_provider: "systemd",
    type: "pmie_check",
  },
  {
    full_name: "systemd:pmie_check.timer",
    class_provider: "systemd",
    type: "pmie_check.timer",
  },
  {
    full_name: "systemd:pmie_daily",
    class_provider: "systemd",
    type: "pmie_daily",
  },
  {
    full_name: "systemd:pmie_daily.timer",
    class_provider: "systemd",
    type: "pmie_daily.timer",
  },
  {
    full_name: "systemd:pmlogger",
    class_provider: "systemd",
    type: "pmlogger",
  },
  {
    full_name: "systemd:pmlogger_check",
    class_provider: "systemd",
    type: "pmlogger_check",
  },
  {
    full_name: "systemd:pmlogger_check.timer",
    class_provider: "systemd",
    type: "pmlogger_check.timer",
  },
  {
    full_name: "systemd:pmlogger_daily",
    class_provider: "systemd",
    type: "pmlogger_daily",
  },
  {
    full_name: "systemd:pmlogger_daily-poll",
    class_provider: "systemd",
    type: "pmlogger_daily-poll",
  },
  {
    full_name: "systemd:pmlogger_daily-poll.timer",
    class_provider: "systemd",
    type: "pmlogger_daily-poll.timer",
  },
  {
    full_name: "systemd:pmlogger_daily.timer",
    class_provider: "systemd",
    type: "pmlogger_daily.timer",
  },
  {
    full_name: "systemd:pmlogger_daily_report",
    class_provider: "systemd",
    type: "pmlogger_daily_report",
  },
  {
    full_name: "systemd:pmlogger_daily_report-poll",
    class_provider: "systemd",
    type: "pmlogger_daily_report-poll",
  },
  {
    full_name: "systemd:pmlogger_daily_report-poll.timer",
    class_provider: "systemd",
    type: "pmlogger_daily_report-poll.timer",
  },
  {
    full_name: "systemd:pmlogger_daily_report.timer",
    class_provider: "systemd",
    type: "pmlogger_daily_report.timer",
  },
  {
    full_name: "systemd:pmproxy",
    class_provider: "systemd",
    type: "pmproxy",
  },
  {
    full_name: "systemd:polkit",
    class_provider: "systemd",
    type: "polkit",
  },
  {
    full_name: "systemd:postfix",
    class_provider: "systemd",
    type: "postfix",
  },
  {
    full_name: "systemd:proc-fs-nfsd.mount",
    class_provider: "systemd",
    type: "proc-fs-nfsd.mount",
  },
  {
    full_name: "systemd:proc-sys-fs-binfmt_misc.mount",
    class_provider: "systemd",
    type: "proc-sys-fs-binfmt_misc.mount",
  },
  {
    full_name: "systemd:qarshd.socket",
    class_provider: "systemd",
    type: "qarshd.socket",
  },
  {
    full_name: "systemd:qarshd@",
    class_provider: "systemd",
    type: "qarshd@",
  },
  {
    full_name: "systemd:qemu-guest-agent",
    class_provider: "systemd",
    type: "qemu-guest-agent",
  },
  {
    full_name: "systemd:quotaon",
    class_provider: "systemd",
    type: "quotaon",
  },
  {
    full_name: "systemd:rc-local",
    class_provider: "systemd",
    type: "rc-local",
  },
  {
    full_name: "systemd:rdisc",
    class_provider: "systemd",
    type: "rdisc",
  },
  {
    full_name: "systemd:rescue",
    class_provider: "systemd",
    type: "rescue",
  },
  {
    full_name: "systemd:restraintd",
    class_provider: "systemd",
    type: "restraintd",
  },
  {
    full_name: "systemd:rhnsd",
    class_provider: "systemd",
    type: "rhnsd",
  },
  {
    full_name: "systemd:rhsm",
    class_provider: "systemd",
    type: "rhsm",
  },
  {
    full_name: "systemd:rhsm-facts",
    class_provider: "systemd",
    type: "rhsm-facts",
  },
  {
    full_name: "systemd:rhsmcertd",
    class_provider: "systemd",
    type: "rhsmcertd",
  },
  {
    full_name: "systemd:rngd",
    class_provider: "systemd",
    type: "rngd",
  },
  {
    full_name: "systemd:rngd-wake-threshold",
    class_provider: "systemd",
    type: "rngd-wake-threshold",
  },
  {
    full_name: "systemd:rpc-gssd",
    class_provider: "systemd",
    type: "rpc-gssd",
  },
  {
    full_name: "systemd:rpc-statd",
    class_provider: "systemd",
    type: "rpc-statd",
  },
  {
    full_name: "systemd:rpc-statd-notify",
    class_provider: "systemd",
    type: "rpc-statd-notify",
  },
  {
    full_name: "systemd:rpcbind",
    class_provider: "systemd",
    type: "rpcbind",
  },
  {
    full_name: "systemd:rpcbind.socket",
    class_provider: "systemd",
    type: "rpcbind.socket",
  },
  {
    full_name: "systemd:rsyslog",
    class_provider: "systemd",
    type: "rsyslog",
  },
  {
    full_name: "systemd:sbd",
    class_provider: "systemd",
    type: "sbd",
  },
  {
    full_name: "systemd:sbd_remote",
    class_provider: "systemd",
    type: "sbd_remote",
  },
  {
    full_name: "systemd:selinux-autorelabel",
    class_provider: "systemd",
    type: "selinux-autorelabel",
  },
  {
    full_name: "systemd:selinux-autorelabel-mark",
    class_provider: "systemd",
    type: "selinux-autorelabel-mark",
  },
  {
    full_name: "systemd:serial-getty@",
    class_provider: "systemd",
    type: "serial-getty@",
  },
  {
    full_name: "systemd:sshd",
    class_provider: "systemd",
    type: "sshd",
  },
  {
    full_name: "systemd:sshd-keygen@",
    class_provider: "systemd",
    type: "sshd-keygen@",
  },
  {
    full_name: "systemd:sshd.socket",
    class_provider: "systemd",
    type: "sshd.socket",
  },
  {
    full_name: "systemd:sshd@",
    class_provider: "systemd",
    type: "sshd@",
  },
  {
    full_name: "systemd:sssd",
    class_provider: "systemd",
    type: "sssd",
  },
  {
    full_name: "systemd:sssd-autofs",
    class_provider: "systemd",
    type: "sssd-autofs",
  },
  {
    full_name: "systemd:sssd-autofs.socket",
    class_provider: "systemd",
    type: "sssd-autofs.socket",
  },
  {
    full_name: "systemd:sssd-kcm",
    class_provider: "systemd",
    type: "sssd-kcm",
  },
  {
    full_name: "systemd:sssd-kcm.socket",
    class_provider: "systemd",
    type: "sssd-kcm.socket",
  },
  {
    full_name: "systemd:sssd-nss",
    class_provider: "systemd",
    type: "sssd-nss",
  },
  {
    full_name: "systemd:sssd-nss.socket",
    class_provider: "systemd",
    type: "sssd-nss.socket",
  },
  {
    full_name: "systemd:sssd-pac",
    class_provider: "systemd",
    type: "sssd-pac",
  },
  {
    full_name: "systemd:sssd-pac.socket",
    class_provider: "systemd",
    type: "sssd-pac.socket",
  },
  {
    full_name: "systemd:sssd-pam",
    class_provider: "systemd",
    type: "sssd-pam",
  },
  {
    full_name: "systemd:sssd-pam-priv.socket",
    class_provider: "systemd",
    type: "sssd-pam-priv.socket",
  },
  {
    full_name: "systemd:sssd-pam.socket",
    class_provider: "systemd",
    type: "sssd-pam.socket",
  },
  {
    full_name: "systemd:sssd-ssh",
    class_provider: "systemd",
    type: "sssd-ssh",
  },
  {
    full_name: "systemd:sssd-ssh.socket",
    class_provider: "systemd",
    type: "sssd-ssh.socket",
  },
  {
    full_name: "systemd:sssd-sudo",
    class_provider: "systemd",
    type: "sssd-sudo",
  },
  {
    full_name: "systemd:sssd-sudo.socket",
    class_provider: "systemd",
    type: "sssd-sudo.socket",
  },
  {
    full_name: "systemd:sys-fs-fuse-connections.mount",
    class_provider: "systemd",
    type: "sys-fs-fuse-connections.mount",
  },
  {
    full_name: "systemd:sys-kernel-config.mount",
    class_provider: "systemd",
    type: "sys-kernel-config.mount",
  },
  {
    full_name: "systemd:sys-kernel-debug.mount",
    class_provider: "systemd",
    type: "sys-kernel-debug.mount",
  },
  {
    full_name: "systemd:syslog",
    class_provider: "systemd",
    type: "syslog",
  },
  {
    full_name: "systemd:syslog.socket",
    class_provider: "systemd",
    type: "syslog.socket",
  },
  {
    full_name: "systemd:system-update-cleanup",
    class_provider: "systemd",
    type: "system-update-cleanup",
  },
  {
    full_name: "systemd:systemd-ask-password-console",
    class_provider: "systemd",
    type: "systemd-ask-password-console",
  },
  {
    full_name: "systemd:systemd-ask-password-console.path",
    class_provider: "systemd",
    type: "systemd-ask-password-console.path",
  },
  {
    full_name: "systemd:systemd-ask-password-plymouth",
    class_provider: "systemd",
    type: "systemd-ask-password-plymouth",
  },
  {
    full_name: "systemd:systemd-ask-password-plymouth.path",
    class_provider: "systemd",
    type: "systemd-ask-password-plymouth.path",
  },
  {
    full_name: "systemd:systemd-ask-password-wall",
    class_provider: "systemd",
    type: "systemd-ask-password-wall",
  },
  {
    full_name: "systemd:systemd-ask-password-wall.path",
    class_provider: "systemd",
    type: "systemd-ask-password-wall.path",
  },
  {
    full_name: "systemd:systemd-backlight@",
    class_provider: "systemd",
    type: "systemd-backlight@",
  },
  {
    full_name: "systemd:systemd-binfmt",
    class_provider: "systemd",
    type: "systemd-binfmt",
  },
  {
    full_name: "systemd:systemd-coredump.socket",
    class_provider: "systemd",
    type: "systemd-coredump.socket",
  },
  {
    full_name: "systemd:systemd-coredump@",
    class_provider: "systemd",
    type: "systemd-coredump@",
  },
  {
    full_name: "systemd:systemd-exit",
    class_provider: "systemd",
    type: "systemd-exit",
  },
  {
    full_name: "systemd:systemd-firstboot",
    class_provider: "systemd",
    type: "systemd-firstboot",
  },
  {
    full_name: "systemd:systemd-fsck-root",
    class_provider: "systemd",
    type: "systemd-fsck-root",
  },
  {
    full_name: "systemd:systemd-fsck@",
    class_provider: "systemd",
    type: "systemd-fsck@",
  },
  {
    full_name: "systemd:systemd-halt",
    class_provider: "systemd",
    type: "systemd-halt",
  },
  {
    full_name: "systemd:systemd-hibernate",
    class_provider: "systemd",
    type: "systemd-hibernate",
  },
  {
    full_name: "systemd:systemd-hibernate-resume@",
    class_provider: "systemd",
    type: "systemd-hibernate-resume@",
  },
  {
    full_name: "systemd:systemd-hostnamed",
    class_provider: "systemd",
    type: "systemd-hostnamed",
  },
  {
    full_name: "systemd:systemd-hwdb-update",
    class_provider: "systemd",
    type: "systemd-hwdb-update",
  },
  {
    full_name: "systemd:systemd-hybrid-sleep",
    class_provider: "systemd",
    type: "systemd-hybrid-sleep",
  },
  {
    full_name: "systemd:systemd-initctl",
    class_provider: "systemd",
    type: "systemd-initctl",
  },
  {
    full_name: "systemd:systemd-initctl.socket",
    class_provider: "systemd",
    type: "systemd-initctl.socket",
  },
  {
    full_name: "systemd:systemd-journal-catalog-update",
    class_provider: "systemd",
    type: "systemd-journal-catalog-update",
  },
  {
    full_name: "systemd:systemd-journal-flush",
    class_provider: "systemd",
    type: "systemd-journal-flush",
  },
  {
    full_name: "systemd:systemd-journald",
    class_provider: "systemd",
    type: "systemd-journald",
  },
  {
    full_name: "systemd:systemd-journald-audit.socket",
    class_provider: "systemd",
    type: "systemd-journald-audit.socket",
  },
  {
    full_name: "systemd:systemd-journald-dev-log.socket",
    class_provider: "systemd",
    type: "systemd-journald-dev-log.socket",
  },
  {
    full_name: "systemd:systemd-journald.socket",
    class_provider: "systemd",
    type: "systemd-journald.socket",
  },
  {
    full_name: "systemd:systemd-kexec",
    class_provider: "systemd",
    type: "systemd-kexec",
  },
  {
    full_name: "systemd:systemd-localed",
    class_provider: "systemd",
    type: "systemd-localed",
  },
  {
    full_name: "systemd:systemd-logind",
    class_provider: "systemd",
    type: "systemd-logind",
  },
  {
    full_name: "systemd:systemd-machine-id-commit",
    class_provider: "systemd",
    type: "systemd-machine-id-commit",
  },
  {
    full_name: "systemd:systemd-modules-load",
    class_provider: "systemd",
    type: "systemd-modules-load",
  },
  {
    full_name: "systemd:systemd-portabled",
    class_provider: "systemd",
    type: "systemd-portabled",
  },
  {
    full_name: "systemd:systemd-poweroff",
    class_provider: "systemd",
    type: "systemd-poweroff",
  },
  {
    full_name: "systemd:systemd-quotacheck",
    class_provider: "systemd",
    type: "systemd-quotacheck",
  },
  {
    full_name: "systemd:systemd-random-seed",
    class_provider: "systemd",
    type: "systemd-random-seed",
  },
  {
    full_name: "systemd:systemd-reboot",
    class_provider: "systemd",
    type: "systemd-reboot",
  },
  {
    full_name: "systemd:systemd-remount-fs",
    class_provider: "systemd",
    type: "systemd-remount-fs",
  },
  {
    full_name: "systemd:systemd-resolved",
    class_provider: "systemd",
    type: "systemd-resolved",
  },
  {
    full_name: "systemd:systemd-rfkill",
    class_provider: "systemd",
    type: "systemd-rfkill",
  },
  {
    full_name: "systemd:systemd-rfkill.socket",
    class_provider: "systemd",
    type: "systemd-rfkill.socket",
  },
  {
    full_name: "systemd:systemd-suspend",
    class_provider: "systemd",
    type: "systemd-suspend",
  },
  {
    full_name: "systemd:systemd-suspend-then-hibernate",
    class_provider: "systemd",
    type: "systemd-suspend-then-hibernate",
  },
  {
    full_name: "systemd:systemd-sysctl",
    class_provider: "systemd",
    type: "systemd-sysctl",
  },
  {
    full_name: "systemd:systemd-sysusers",
    class_provider: "systemd",
    type: "systemd-sysusers",
  },
  {
    full_name: "systemd:systemd-timedated",
    class_provider: "systemd",
    type: "systemd-timedated",
  },
  {
    full_name: "systemd:systemd-tmpfiles-clean",
    class_provider: "systemd",
    type: "systemd-tmpfiles-clean",
  },
  {
    full_name: "systemd:systemd-tmpfiles-clean.timer",
    class_provider: "systemd",
    type: "systemd-tmpfiles-clean.timer",
  },
  {
    full_name: "systemd:systemd-tmpfiles-setup",
    class_provider: "systemd",
    type: "systemd-tmpfiles-setup",
  },
  {
    full_name: "systemd:systemd-tmpfiles-setup-dev",
    class_provider: "systemd",
    type: "systemd-tmpfiles-setup-dev",
  },
  {
    full_name: "systemd:systemd-udev-settle",
    class_provider: "systemd",
    type: "systemd-udev-settle",
  },
  {
    full_name: "systemd:systemd-udev-trigger",
    class_provider: "systemd",
    type: "systemd-udev-trigger",
  },
  {
    full_name: "systemd:systemd-udevd",
    class_provider: "systemd",
    type: "systemd-udevd",
  },
  {
    full_name: "systemd:systemd-udevd-control.socket",
    class_provider: "systemd",
    type: "systemd-udevd-control.socket",
  },
  {
    full_name: "systemd:systemd-udevd-kernel.socket",
    class_provider: "systemd",
    type: "systemd-udevd-kernel.socket",
  },
  {
    full_name: "systemd:systemd-update-done",
    class_provider: "systemd",
    type: "systemd-update-done",
  },
  {
    full_name: "systemd:systemd-update-utmp",
    class_provider: "systemd",
    type: "systemd-update-utmp",
  },
  {
    full_name: "systemd:systemd-update-utmp-runlevel",
    class_provider: "systemd",
    type: "systemd-update-utmp-runlevel",
  },
  {
    full_name: "systemd:systemd-user-sessions",
    class_provider: "systemd",
    type: "systemd-user-sessions",
  },
  {
    full_name: "systemd:systemd-vconsole-setup",
    class_provider: "systemd",
    type: "systemd-vconsole-setup",
  },
  {
    full_name: "systemd:systemd-volatile-root",
    class_provider: "systemd",
    type: "systemd-volatile-root",
  },
  {
    full_name: "systemd:teamd@",
    class_provider: "systemd",
    type: "teamd@",
  },
  {
    full_name: "systemd:timedatex",
    class_provider: "systemd",
    type: "timedatex",
  },
  {
    full_name: "systemd:tmp.mount",
    class_provider: "systemd",
    type: "tmp.mount",
  },
  {
    full_name: "systemd:tuned",
    class_provider: "systemd",
    type: "tuned",
  },
  {
    full_name: "systemd:unbound-anchor",
    class_provider: "systemd",
    type: "unbound-anchor",
  },
  {
    full_name: "systemd:unbound-anchor.timer",
    class_provider: "systemd",
    type: "unbound-anchor.timer",
  },
  {
    full_name: "systemd:user-runtime-dir@",
    class_provider: "systemd",
    type: "user-runtime-dir@",
  },
  {
    full_name: "systemd:user@",
    class_provider: "systemd",
    type: "user@",
  },
  {
    full_name: "systemd:var-lib-nfs-rpc_pipefs.mount",
    class_provider: "systemd",
    type: "var-lib-nfs-rpc_pipefs.mount",
  },
  {
    full_name: "systemd:vdo",
    class_provider: "systemd",
    type: "vdo",
  },
];
module.exports = {
  ok,
};
