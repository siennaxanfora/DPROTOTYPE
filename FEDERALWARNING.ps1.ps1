<<#  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    • Matrix rain for 60 s
    • 5-second beeps every 2 s (runs in background)
    • Ends with fake blue screen + 30-s countdown
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ #>

# 0) CONFIG
$matrixDuration = 60      # seconds       ◀─ step 2
$loopDelayMs    = 10      # ms between lines ◀─ step 1
$warnText       = "KERNEL BREACH DETECTED!  RISK OF PERMANENT DELETION OF EXISTING DATA = HIGH!"

# 1) Initial red alert
Write-Host $warnText -ForegroundColor Red
[console]::Beep(900, 300)
Start-Sleep 1
Clear-Host

# 2) Start background beep job  ◀─ step 3
$beepJob = Start-Job -ScriptBlock {
    while ($true) {
        [console]::Beep(1000, 5000)   # loud 5-s tone
        Start-Sleep -Seconds 2        # pause 2 s
    }
}

# 3) Matrix rain loop
$chars = (35..126 | ForEach-Object { [char]$_ })
$end   = (Get-Date).AddSeconds($matrixDuration)

while ((Get-Date) -lt $end) {
    $len  = Get-Random -Minimum 40 -Maximum 80
    $line = -join (1..$len | ForEach-Object { $chars | Get-Random })
    Write-Host $line -ForegroundColor Green
    Start-Sleep -Milliseconds $loopDelayMs
}

# 4) Stop beeping, prep blue screen  ◀─ step 4
Stop-Job $beepJob | Out-Null
Remove-Job $beepJob | Out-Null

$Host.UI.RawUI.BackgroundColor = 'Blue'
$Host.UI.RawUI.ForegroundColor = 'White'
Clear-Host

# 5) Display the big scare message
$bsod = @"
ALL DATA COMPROMISED.  
TOTAL FELONY COUNT DETECTED IN THIS IP ADDRESS: 166  
ACTIVITIES DETECTED FROM 28 FOREIGN IP ADDRESSES.  

ALL DATA WILL BE WIPED OUT FROM THIS DEVICE IN 30 SECONDS.  
THE USER OF THIS DEVICE IS NOW SUBJECT TO LEGAL QUESTIONING  
AND IMMEDIATE INTERROGATION FROM THE DEPARTMENT OF INFORMATION AND COMMUNICATIONS TECHNOLOGY (DICT), THE PHILIPPINE NATIONAL POLICE ANTI-CYBERCRIME GROUP (PNP-ACG) CYBERCRIME INVESTIGATION AND COORDINATING CENTER (CICC), NPC (National Privacy Commission), DEPARTMENT OF JUSTICE - ALIAS USED: LAUREN.   ALIAS USED: LAUREN.   
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA
ALIAS USED: LAUREN.   NAOMI MOTOJIMA


DO NOT BE MORE THAN 2 METERS AWAY FROM YOUR PREMISES.  
FAILURE TO COMPLY WILL RESULT IN 25 YEARS OF IMPRISONMENT  
WITHOUT PAROLE.

"@
Write-Host $bsod

# 6) Countdown 30 → 1
for ($i = 30; $i -ge 1; $i--) {
    Write-Host ("Device wipe commences in {0} second{1}..." -f $i, $(if($i -eq 1){''}else{'s'}))
    Start-Sleep 1
}

Write-Host "`n*** Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.Status Changed: CYBERCRIMINAL.
...........
 Awaiting prosecution date. ***" -ForegroundColor Red

