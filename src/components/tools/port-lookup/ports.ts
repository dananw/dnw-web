export interface PortEntry {
  port: number;
  protocol: string;
  service: string;
  description: string;
}

/** Well-known and commonly used TCP/UDP ports. */
export const PORTS: PortEntry[] = [
  { port: 20, protocol: "TCP", service: "FTP-DATA", description: "File Transfer Protocol (data)" },
  { port: 21, protocol: "TCP", service: "FTP", description: "File Transfer Protocol (control)" },
  { port: 22, protocol: "TCP", service: "SSH", description: "Secure Shell, SCP, SFTP" },
  { port: 23, protocol: "TCP", service: "Telnet", description: "Unencrypted remote login" },
  { port: 25, protocol: "TCP", service: "SMTP", description: "Email routing" },
  { port: 53, protocol: "TCP/UDP", service: "DNS", description: "Domain Name System" },
  { port: 67, protocol: "UDP", service: "DHCP", description: "Dynamic host configuration (server)" },
  { port: 68, protocol: "UDP", service: "DHCP", description: "Dynamic host configuration (client)" },
  { port: 69, protocol: "UDP", service: "TFTP", description: "Trivial File Transfer Protocol" },
  { port: 80, protocol: "TCP", service: "HTTP", description: "Web traffic" },
  { port: 110, protocol: "TCP", service: "POP3", description: "Email retrieval" },
  { port: 119, protocol: "TCP", service: "NNTP", description: "Network News Transfer Protocol" },
  { port: 123, protocol: "UDP", service: "NTP", description: "Network Time Protocol" },
  { port: 143, protocol: "TCP", service: "IMAP", description: "Email retrieval" },
  { port: 161, protocol: "UDP", service: "SNMP", description: "Network management" },
  { port: 389, protocol: "TCP/UDP", service: "LDAP", description: "Directory services" },
  { port: 443, protocol: "TCP", service: "HTTPS", description: "Secure web traffic (TLS)" },
  { port: 445, protocol: "TCP", service: "SMB", description: "Windows file sharing" },
  { port: 465, protocol: "TCP", service: "SMTPS", description: "SMTP over TLS" },
  { port: 514, protocol: "UDP", service: "Syslog", description: "System logging" },
  { port: 587, protocol: "TCP", service: "SMTP", description: "Email submission (STARTTLS)" },
  { port: 631, protocol: "TCP", service: "IPP", description: "Internet Printing Protocol" },
  { port: 993, protocol: "TCP", service: "IMAPS", description: "IMAP over TLS" },
  { port: 995, protocol: "TCP", service: "POP3S", description: "POP3 over TLS" },
  { port: 1433, protocol: "TCP", service: "MSSQL", description: "Microsoft SQL Server" },
  { port: 1521, protocol: "TCP", service: "Oracle", description: "Oracle database" },
  { port: 2049, protocol: "TCP/UDP", service: "NFS", description: "Network File System" },
  { port: 2375, protocol: "TCP", service: "Docker", description: "Docker daemon (unencrypted)" },
  { port: 2376, protocol: "TCP", service: "Docker", description: "Docker daemon (TLS)" },
  { port: 3000, protocol: "TCP", service: "Dev server", description: "Common Node/React dev port" },
  { port: 3306, protocol: "TCP", service: "MySQL", description: "MySQL / MariaDB" },
  { port: 3389, protocol: "TCP", service: "RDP", description: "Remote Desktop Protocol" },
  { port: 5432, protocol: "TCP", service: "PostgreSQL", description: "PostgreSQL database" },
  { port: 5672, protocol: "TCP", service: "AMQP", description: "RabbitMQ message broker" },
  { port: 5900, protocol: "TCP", service: "VNC", description: "Remote desktop" },
  { port: 6379, protocol: "TCP", service: "Redis", description: "Redis key-value store" },
  { port: 8080, protocol: "TCP", service: "HTTP-alt", description: "Alternate HTTP / proxies" },
  { port: 8443, protocol: "TCP", service: "HTTPS-alt", description: "Alternate HTTPS" },
  { port: 9000, protocol: "TCP", service: "Dev/PHP-FPM", description: "PHP-FPM, dev servers" },
  { port: 9200, protocol: "TCP", service: "Elasticsearch", description: "Elasticsearch HTTP" },
  { port: 11211, protocol: "TCP/UDP", service: "Memcached", description: "Memcached cache" },
  { port: 27017, protocol: "TCP", service: "MongoDB", description: "MongoDB database" },
];

export function searchPorts(query: string): PortEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return PORTS;
  return PORTS.filter(
    (p) =>
      String(p.port).includes(q) ||
      p.service.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
