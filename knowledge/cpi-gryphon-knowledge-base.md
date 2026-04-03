# CPI GRYPHON COIN CHANGER - COMPLETE GUIDE
## Source: Official CPI Technician Guide + Diagnostic Manuals

---

# COMPONENTS

| # | Item | Description |
|---|------|-------------|
| 1 | Coin Return | Press to reject coin and open validator door |
| 2 | Validator Latch | Pull to remove validator assembly |
| 3 | MMI (Display/Keypad) | Screen and keypad to interact with changer |
| 4 | Diagnostic LEDs | Red, amber, green status lights |
| 5 | Cassette | Stores coins for dispensing as change |
| 6 | Dispenser | Dispenses coins returned as change |
| 7 | Cassette Release Tab | Lift and pull to remove cassette |
| 8 | Micro USB Port | Connect to PC or USB stick for audits/updates |

---

# KEYPAD CONTROLS

| Key | Function |
|-----|----------|
| A-F | Navigate menus / Dispense from tubes A-F |
| ◄ | Move left |
| ► | Move right |
| ▲ | Scroll up |
| ▼ | Scroll down |
| ◄◄ | Previous page |
| ►► | Next page |
| Menu | Access Service/Setup menus (press once = previous menu, hold 3 sec = home) |

---

# DISPLAY SYMBOLS

| Symbol | Meaning |
|--------|---------|
| ✓ | Unit is OK |
| ⚠ | Unit requires attention |
| ✗ | Fatal error - replacement required |
| USB-PC | Connected to PC via USB |
| USB-stick | Connected to USB stick |

---

# LED LOCATION

**CashFlow 7500:**
- LEDs on front of discriminator
- To the LEFT of the MMI display

**Gryphon:**
- LEDs on front of discriminator  
- BELOW the MMI display

---

# GREEN LED CODES

| Pattern | Meaning |
|---------|---------|
| Constant ON | Correct operation ✓ |
| 1 flash | Coin accepted |
| 2 flashes | Coin rejected |
| 3 flashes | Valid coin ejected — problem with coin changer or system program |
| Slow flashes | Coin changer in setup or service mode |
| Fast flashes (Gryphon) | Audit or firmware update in progress via USB |
| Fast flashes (CF7500) | Check MMI display for message |

---

# AMBER LED CODES

| Pattern | Meaning | Action |
|---------|---------|--------|
| Constant ON | Coin changer deactivated | Check harness connection and system for errors |
| 1 flash | Discriminator error | Check discriminator lid and coin return lever |
| 2 flashes | Validator error | Check validator area for coin jams |
| 3 flashes | Separator or cassette error | Check separator area and cassette for jams |
| 4 flashes | Dispenser error (Gryphon only) | Check dispenser for jams, verify disks align |
| 5 flashes | Low change error (CF7500 only) | Fill all coin tubes to minimum 50% capacity |

---

# MULTIPLE LED PATTERNS

| Pattern | Meaning |
|---------|---------|
| LEDs flash 5 times in sequence | Normal startup sequence |
| Red + Green flash in sequence | **Coin changer failure — service required** |

---

# QUICK TROUBLESHOOTING

## Coins Being Rejected (Green LED 2 flashes)
1. Check for debris in coin path
2. Clean discriminator sensors
3. Verify coin type is programmed

## Coins Accepted Then Ejected (Green LED 3 flashes)
1. Check coin changer programming
2. Verify system communication
3. May indicate tube full condition

## Amber LED Constant ON
1. Check MDB harness connection to VMC
2. Verify coin changer is enabled in machine settings
3. Check for system errors

## Amber LED 1 Flash (Discriminator Error)
1. Open and close discriminator lid
2. Check coin return lever position
3. Clean discriminator area

## Amber LED 2 Flashes (Validator Error)
1. Check validator for jammed coins
2. Clear any obstructions
3. Clean validator path

## Amber LED 3 Flashes (Separator/Cassette Error)
1. Check separator for jammed coins
2. Inspect cassette
3. Clear any obstructions

## Amber LED 4 Flashes (Dispenser Error - Gryphon)
1. Check dispenser area for jams
2. Verify dispenser disks are aligned correctly
3. Clear obstructions

## Red + Green Alternating Flash
**CRITICAL: Coin changer has failed**
- Service or replacement required
- Contact CPI support: support@cranepi.com

---

# SERVICE MENU (Press Menu Button)

| Key | Function |
|-----|----------|
| A | Start float operation |
| D | Configure tube denominations (custom cassette) |
| D + 3 letters | Enter cassette code (on front of cassette) |
| E | Access Setup menus |
| ►► | Read basic audit on display |

---

# SETUP MENU (Press Menu → E)

| Item | Description |
|------|-------------|
| Float Mode | Change float mode, target levels, target value, snapshots |
| Change Management | Adjust float levels and coin mix for change |
| Machine Options | Settings for machine interface |
| Coin Config | Enable/disable coins, security level, tokens, dual currency |
| Audit Config | Audit-related settings |
| General | Save settings, calibrate tubes, currency, display, keypad |
| Error Log | View and reset recent errors |
| Test | Run tests to confirm operation |
| Language | Change display language |

---

# INSTALLATION

1. Turn OFF power to vending machine
2. Lift yellow latch (top right), tilt validator forward
3. Hang changer on machine's mounting screws (top 2 first, then lower)
4. Tighten screws (don't over-tighten)
5. Close validator assembly
6. Remove cassette, fill with coins in correct tubes
7. Return cassette, ensure seated correctly
8. Restore power

## Alignment Check

1. Gap of **2-4mm** between machine reject lever and changer return lever
2. Press coin return on machine door — should fully open/close validator door
3. Check coin entry chute alignment — must not impede validator door
4. Test coin routing before putting in service

---

# CPI SUPPORT

- **Phone:** 800-628-8363
- **Email:** support@cranepi.com
- **Website:** cranepi.com/support

---

---

# CASSETTE PROGRAMMING & CALIBRATION

## Program a Pre-Configured Cassette

1. Press **Menu** button
2. Press **"D"** for Cassette
3. Enter the **3-letter cassette code** (found on bottom of cassette)
   - Example: AAA
4. Press **"F"** to save the code
5. Press **"F"** to start tube calibration
   - ⚠️ **Tubes must be EMPTY to calibrate**
6. Press **Menu** to finish

## Calibrate Tubes Only

1. Press **Menu** button
2. Press **"E"** for Setup
3. Press **"F"** to scroll right
4. Press **"B"** for General
5. Press **"A"** to calibrate tubes
   - ⚠️ **Tubes must be EMPTY to calibrate**
6. Press **"F"** to start
7. Press **Menu** to finish

## Program a Custom Cassette

1. Press **Menu** button
2. Press **"D"** for Cassette
3. Press **Menu** for Custom
4. Press the button for the tube to program (A, B, C, D, E, or F)
5. Use **"D"** and **"E"** buttons to scroll through denominations
6. Press **"F"** to save
7. Repeat steps 4-6 for each tube
8. Press **Menu** to complete
9. Press **"F"** to start calibration
   - ⚠️ **Tubes must be EMPTY to calibrate**
10. Press **Menu** to finish

---

# TUBES JAMMED ERROR - FIX PROCEDURE

**When display shows "Tubes Jammed" for a coin tube (A, B, C, D, E, or F):**

## Step 1: Remove Coin Cassette
1. Lift the cassette lever
2. Pull the cassette out of the housing

## Step 2: Empty and Inspect Cassette
1. Remove ALL coins from the cassette
2. While removing coins, look for:
   - **Incorrect coins** in the tubes (wrong denomination)
   - **Tilted or out-of-position coins**
   - **Coin jams at the bottom** of the cassette
   - **Coins not fully dispensed** in bottom housing

## Step 3: Check Payout Disks
There are 3 payout disk positions:

| Position | Disk Type | Coin Tubes |
|----------|-----------|------------|
| Left | AB payout disk | Tube A + Tube B |
| Center | CD/EF payout disk | Tube C + Tube D |
| Right | CD/EF payout disk | Tube E + Tube F |

**Check each disk:**
1. Make sure disk is in correct position under its tubes
2. Make sure white tab on disk aligns with arrow on housing

**If disk is misaligned:**
1. Pull up disk and disengage center clip
2. Reposition disk correctly
3. Align white tab with housing arrow
4. Reinstall center clip

## Step 4: Clear the Error
1. Press the button on display for the tube with the error
2. This turns the payout disk to start position
3. Transmits error correction signal

## Step 5: Refill and Reinstall
1. Fill cassette with coins (correct tubes!)
2. Install cassette back into changer
3. Check display:
   - **"OK" + coin total** = Fixed ✓ (green LED)
   - **Error message** = Still broken (amber LED flashing)

## Step 6: Still Not Working?
Contact CPI Technical Support:
- **Phone:** 800-628-8363
- **Email:** support@cranepi.com

---

*Source: Official CPI CashFlow 7000/Gryphon diagnostic manuals*
*For VendiQ AI Troubleshooting Assistant*
