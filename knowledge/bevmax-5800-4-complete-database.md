# BEVMAX 5800-4 COMPLETE TROUBLESHOOTING DATABASE
## Source: Official Manuals + Forums + Technical Bulletins + Parts Documentation
## Models: DN5800-4, DN5800-E4, DN3800-4, DN3800-E4

⚠️ **CRITICAL SAFETY:** Always unplug before servicing. R-134a refrigerant requires EPA 608 certification. NO extension cords. Crane Support: 1-803-266-5001

---

# DIAGNOSTIC MODES & ACCESS

## Service Mode Access
- **Service Mode:** Press service button once → "Error Codes"
- **Test Mode:** Press service button twice  
- **Factory Diagnostics:** Test Mode → F → *
- **BevMax Setup:** From "Error Codes" → press 1-5-1-5-1

## Key Diagnostic Tests
| Test | Access | Function |
|------|--------|----------|
| **Test Vend** | Test Mode → 9 → * | Close door, make selection |
| **Position Test** | Factory Diagnostics → 1 | Move XY mechanism |
| **Port Test** | Factory Diagnostics → 2 | Test port door A=open, B=close |
| **Cup Check** | Factory Diagnostics → 3 | Check picker cup sensors |
| **Shelf Offset** | Factory Diagnostics → 8 | Adjust Y-axis positioning |
| **Hook Swipe X** | Factory Diagnostics → 0 | Adjust cup-to-port transfer |
| **Relay Toggle** | Service Mode → 9 → * | Test Light A, Fan B, Compressor C |

## Error Code Access
1. Open door → Press service button → "Error Codes"
2. Press **4** → shows first error or "No Errors"
3. Press **2/3** to scroll through errors
4. Press **4** on error for details
5. **Hold 4 for 2 seconds** to clear after repair

---

# XY MECHANISM ISSUES (Most Common Problems)

## XY-001: Machine Won't Vend - XY System Failure ⭐ MOST COMMON

**Symptoms:**
- Accepts payment but no product dispenses
- HORIZ or VERT error codes
- XY mechanism stuck or erratic

**#1 MOST LIKELY FIX:**
Check service door is fully closed. Motor Power Interrupt switch cuts power when door open.

**If that doesn't work:**
1. **Test Vend:** Test Mode → 9 → * → close door → select item
2. **Check STS:** Setup Mode 2 → verify selection has column assigned  
3. **Check Shelf Offset:** Service Mode → 8 (Default D2 = 700)
4. **Belt Tension Test:** Position Test → move E1 to E9, listen for ratcheting
5. **Adjust Belt:** Loosen 3× 11/32 nuts, adjust pulley up 1/8" at a time
6. **Check Home Switches:** Amber (X), Green (Y), Red (picker) LEDs at home
7. **Verify P1 connection** to control board

**Parts:** X Motor, Y Motor, Drive belt, Home switches  
**Tools:** 7/16" wrench, 11/32" wrench, multimeter

---

## XY-002: Picker Cup Misalignment

**Symptoms:**
- Plunger hits chassis instead of gate target
- Product fails to eject from shelf

**Fix:**
1. Check tray level and secured to supports
2. **Adjust Shelf Offset:** Test Mode → F → * → 8
3. **Target:** Picker strikes gate ≤1/16" from top, ≥halfway down  
4. Test at A1, B3, C5, D7, E9 positions
5. **Gen 1 default:** 9200 | **Gen 2 default:** 2500

---

## XY-003: Product Won't Transfer to Port

**Symptoms:**
- Product picked but stays in cup
- Cup reaches port but product doesn't transfer

**Fix:**
1. **Test Vend** and observe movement
2. Check belt tension
3. Verify port door assembly securely installed
4. **Adjust Hook Swipe X:** Factory Diagnostics → 0 (Default: 93871)
5. Cup should stop quarter-thickness from wall above port

---

## XY-004: Picker Home Switch Failure ⭐ KNOWN WEAK POINT

**Symptoms:**
- PICKI error code
- Cup doesn't return home
- Erratic XY behavior

**Fix:**
1. **Delivery Cup Check:** Factory Diagnostics → 3
2. Clean switch area - remove syrup buildup
3. **RECOMMENDED:** Install Magnet Home Switch Upgrade Kit
4. Replace picker cup assembly if needed (Extended version: DIXCR0027487)

**Note:** Original mechanical switch is known design flaw prone to syrup contamination

---

## XY-005: Picker Seeking Wrong Position

**Symptoms:**
- Seeks wrong shelf after electrical incident
- Position too high after power surge

**Fix:**
1. Re-plumb vend mechanism (Crane Tech support procedure)
2. Replace picker cup and port door if electrical damage
3. Recalibrate Shelf Offset and Hook Swipe X
4. Check/replace control board if needed

**⚠️ Professional service recommended for electrical damage cases**

---

# COOLING/REFRIGERATION ISSUES

## COOL-001: Machine Not Cooling ⭐ #1 COOLING PROBLEM

**Symptoms:**
- Products warm despite compressor running
- High temperature readings
- Compressor won't start

**#1 MOST LIKELY FIX:**
**Dirty condenser coils.** Clean with vacuum and brush - this fixes most cooling issues.

**If that doesn't work:**
1. **Service door closed?** (Door interlock prevents compressor)
2. **Compressor plugged in?** (Check AC distribution box outlet)
3. **Rear clearance:** Minimum 4" from wall
4. **Test Fan:** Service Mode → 9 → * → B (Fan test)
5. **Test Compressor:** Service Mode → 9 → * → C (**⚠️ DISCONNECT POWER FIRST**)
6. **Check voltage** at wall outlet (no extension cords!)

**⚠️ SAFETY:** R-134a refrigerant work requires EPA 608 certification
**Parts:** Thermostat, starting capacitor, complete refrigeration unit

---

# PORT DOOR ISSUES

## PORT-001: Port Door Won't Open

**Symptoms:**
- Delivery door stays closed after vend
- Opens slowly then stops
- PORT error code

**Fix:**
1. **Port Test:** Factory Diagnostics → 2
2. Pull left door interrupt switch for power
3. **A=open, B=close, C=sensor ON, D=sensor OFF**
4. Remove grease buildup: 2 screws from back, drop assembly bottom
5. Clean excessive grease from under vault door
6. **Check:** P1 pin 4 getting 5VDC from P7 pin 1 VMC

**Parts:** Port motor, vend sensor, port board

---

# PAYMENT SYSTEM ISSUES

## PAY-001: Coin Problems

**Symptoms:**
- All coins rejected
- Incorrect change
- CM CC or CM TS errors

**#1 MOST LIKELY FIX:**
**Coin tubes low or empty.** Fill tubes to at least 50% capacity.

**If that doesn't work:**
1. Test with **both doors closed**
2. Check MDB harness connections
3. Clear coin jams, clean mechanism
4. Verify push nuts on coin return assembly in place

---

## PAY-002: Bill Validator Issues

**Symptoms:**
- Bills rejected or returned
- Bill path jams

**Fix:**
1. Test with **both doors closed**
2. Clear bill path obstructions
3. Clean bill path sensors
4. **Important:** BevMax 4 works with **MDB bill acceptor ONLY**
5. Check MDB daisy chain: Controller → Coin → Bill → Card Reader

**Parts:** Bill validator belts (use OEM only), validator unit

---

# COMMON ERROR CODES

| Code | Problem | First Fix |
|------|---------|-----------|
| **HORIZ** | X motor issue | Check service door closed |
| **VERT** | Y motor issue | Check service door closed |
| **PICKI** | Picker home switch | Clean switch, remove syrup |
| **PORT** | Port door system | Port test, check grease buildup |
| **VS** | Vend sensor | Clean sensor, check connections |
| **FRAM** | Memory error | Power cycle, check battery |
| **CM CC** | Coin mech disconnected | Check MDB harness |
| **CM TS** | Tube sensor defective | Fill coin tubes |

---

# MECHANICAL ISSUES

## MECH-001: Broken Gates
**Check:** Wiggle each gate, look for cracks  
**Fix:** Replace any cracked gates immediately

## ALIGN-001: Y-Axis Misalignment
**Symptoms:** Uneven gaps, picker hits walls  
**Fix:** Measure gaps, loosen 2 screws below cup, pivot until equal gaps

---

# ELECTRICAL ISSUES

## ELEC-001: Control Board Problems

**Symptoms:**
- Abnormal Cabinet Control Board status lights
- No VMC communication

**Check:** 5 Cabinet Control Boards - green lights should show VMC communication  
**Normal:** Heartbeat pattern only appears right after power on until VMC sends first message

---

# PREVENTIVE MAINTENANCE CHECKLIST

## Weekly/Monthly
1. **Clean condenser coils** (vacuum dust/debris)
2. **Inspect gates** for cracks  
3. **Check coin/bill paths** for jams
4. **Clean XY rails** if syrup spills present

## Quarterly  
1. **Check belt tension**
2. **Inspect door gaskets** (replace if cracked, NEVER lubricate)
3. **Clean drain pan/tube** for mold/debris
4. **Verify 4" rear clearance**
5. **Inspect power cord** for damage

---

# DEFAULT SETTINGS

| Setting | Generation 1 | Generation 2 | Notes |
|---------|-------------|-------------|--------|
| **Shelf Offset** | 9200 | 2500 | Factory Diagnostics → 8 |
| **Hook Swipe X** | 93871 | 93871 | Factory Diagnostics → 0 |
| **Shelf Location** | D2 (700) | D2 (700) | Domestic setting |

---

# ⚠️ CRITICAL SAFETY WARNINGS

## ELECTRICAL
- **NO EXTENSION CORDS** - direct outlet only
- **Unplug before servicing** electrical components  
- **GFCI test failure** = DO NOT USE, call Crane 1-803-266-5001
- **Disconnect compressor power** before testing relay

## REFRIGERANT  
- **R-134a requires EPA 608 certification**
- **No DIY refrigerant work** without certification
- **Complete sealed units available** as plug-and-play replacement

## PHYSICAL
- **NO hand truck or stair climber** - pallet jack only
- **Secure to floor/wall** to prevent tipping
- **DON'T SLAM DOOR** - damages electronics
- **Indoor use only** - keep out of direct sunlight

---

# TECHNICAL SUPPORT

**Crane Technical Support:** 1-803-266-5001  
**Operating Range:** 75°F-90°F (23°C-32°C), 65% RH  
**Production Start:** March/April 2009  
**Models Covered:** DN5800-4, DN5800-E4, DN3800-4, DN3800-E4

---

*Database compiled from Official Crane/Dixie-Narco Manuals, VENDiscuss Forums, D&S Vending Guides, Coca-Cola Technical Bulletins, Capital Vending Documentation, and Vending Works Specifications*

**⭐ = Most Common Issues | First try the #1 MOST LIKELY FIX before other steps**