# 1) Defender health (read-only)
Get-MpComputerStatus |
  Select-Object AMServiceEnabled,AntispywareEnabled,AntivirusEnabled,AMServiceVersion,AntispywareSignatureLastUpdated,AntivirusSignatureLastUpdated |
  Format-List

# 2) List registered AV products (detect conflicts)
Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct |
  Select displayName,instanceGuid,pathToSignedProductExe | Format-Table -AutoSize

# 3) Show recent Defender events (last 48 hours)
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Windows Defender/Operational';StartTime=(Get-Date).AddDays(-2)} |
  Select TimeCreated,Id,Message -First 50

# 4) Run a safe quick scan (user-initiated)
Start-MpScan -ScanType QuickScan
