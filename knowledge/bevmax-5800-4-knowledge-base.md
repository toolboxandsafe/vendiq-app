# CRANE BEVMAX 5800-4 KNOWLEDGE BASE
## Source: Official Crane Manual (bevmax-4-5800-4-generic-manual-62031.pdf)
## 103 Pages | Last Updated: April 2026

---

# QUICK REFERENCE

## Enter Service Mode
- Open service door
- Press Service Button **once**
- Display shows "SERVICE MODE"

## Enter Test Mode  
- Open service door
- Press Service Button **twice**
- Display shows "TEST MODE"

## Test Vend a Selection
1. Enter **Test Mode** (press service button twice)
2. Press key **"9"**
3. Press **"*"** (enter)
4. Display shows "Enter Selection"
5. **Close the service door** (or open all the way)
6. Enter selection (e.g., A1, B3)
7. Machine vends that selection

## Clear All Errors
- Test Mode → Press "B" (List Errors) → Scroll to "END LIST" → Press "*" to clear

## Crane Technical Support
- Phone: Contact Crane Merchandising Systems
- Website: craneconvenience.com

---

# SERVICE MODE MENU (Press Service Button Once)

| Key | Function |
|-----|----------|
| A | Next Item (scroll) |
| B | Cash Box |
| 1 | Enable Item (block/unblock selections) |
| 2 | Total Sales |
| 3 | Sales by Column |
| 4 | Escrow On/Off |
| 5 | Force Vend On/Off |
| 6 | Set Temperature Scale (F/C) |
| 7 | Set Prices |
| 8 | Set Shelf Location |
| 9 | Relay Toggle (test light/fan/compressor relays) |
| 0 | Clear Errors |

---

# TEST MODE MENU (Press Service Button Twice)

| Key | Function |
|-----|----------|
| A | Next Item (scroll) |
| B | List Errors |
| C | Light Timer |
| D | Enable Snack Menus |
| E | Keypad Test |
| F | Factory Diagnostics |
| 1 | Tube Fill/Dispense |
| 2 | Daylight Savings Time |
| 3 | Not Available Mode |
| 4 | Credit Timer Mode |
| 5 | Door Open (count) |
| 6 | Power Out (count) |
| 7 | Test Health Guard |
| 8 | Motor Run Time |
| 9 | **Test Vend** |

---

# FACTORY DIAGNOSTICS (Test Mode → F → *)

| Key | Function |
|-----|----------|
| 1 | Position Test (move XY to shelf/column) |
| 2 | Port Test (open/close port door) |
| 3 | Delivery Cup Check |
| 4 | Repeat Vend (auto test all columns) |
| 5 | Vend Error Codes (factory only) |
| 6 | Product Sensors On/Off |
| 7 | Turns off vend mech (factory only) |
| 8 | Adjust Shelf (Y) Offset |
| 9 | Not used |
| 0 | Adjust Hook Swipe X Offset |
| A | Build Number |
| B | Reset Model Number |
| E | Extended Cup |
| F | Cup Sensor On/Off |

---

# POSITION TEST (Factory Diagnostics → 1)

**Note:** Door switch must be pulled OUT to perform this test.
**Caution:** XY must be in home position before testing.

Check diagnostic lights on controller:
- **Green** = Y axis home switch (bottom of port cup)
- **Amber/Yellow** = X axis home switch (left side of Y motor)
- **Red** = Picker plunger home switch

**Controls:**
- **A, B, C, D, E** = Travel to shelf A, B, C, D, E
- **1-9** = Travel to column 1-9
- **0** = Cycle cup plunger to hit target
- **F** = Return cup to home position
- ***** = All stop

---

# PORT TEST (Factory Diagnostics → 2)

Display shows 4 numbers "####":
- 1st # = Port Open switch (0=not open, 1=open)
- 2nd # = Port Closed switch (0=not closed, 1=closed)
- 3rd # = Sensor (0=off, 1=on)
- 4th # = Vend detect (0=no product, 1=product in port)

**Controls:**
- **A** = Open port
- **B** = Close port
- **C** = Turn sensor on
- **D** = Turn sensor off
- **E** = Toggle cup LED
- **F** = Toggle port LED
- ***** = All stop

---

# ERROR CODES

## View Errors
Test Mode → Press "B" → List Errors

## Error Categories

### VEND MECHANISM ERRORS
| Code | Meaning |
|------|---------|
| HORIZ | Horizontal (X) drive system problem |
| VERT | Vertical (Y) drive system problem |
| PICKI | Picker not all the way in |
| PICKO | Picker out switch error |
| PICKRS | Picker return spring |
| PORT | Port drive system problem |
| VS | Vend sensor problem |

### VMC (CONTROLLER) ERRORS
| Code | Meaning |
|------|---------|
| FRAM | Memory module read/write error |
| RTC | Clock error |
| SF | Decimal error |
| RCRC | Software not loaded properly |
| LB | Low battery |
| CTRL PWR OUT | Power lost |

### KEYPAD ERROR
| Code | Meaning |
|------|---------|
| KEYPAD | Keypad not installed |

### COIN MECH ERRORS
| Code | Meaning |
|------|---------|
| CM CC | Coin mech disconnected |
| CM TS | Tube sensor defective |
| CM IC | No coin accepted for 96 hours |
| CM TJXX | Tube jam |
| CM EE | Excessive escrow pressed |
| CM NJ | Coin jam |
| CM LA | Low acceptance count |
| CM DIS | Acceptor unplugged |
| CM ROUT | Coin routing error |

### BILL ACCEPTOR ERRORS
| Code | Meaning |
|------|---------|
| NA BC | Bill acceptor disconnected |
| NA BFUL | Stacker full |
| NA BILL | Defective motor |
| NA BJ | Validator jammed |
| NA BRCH | ROM checksum error |
| NA BOPN | Stacker out of position |
| NA BS | Sensor problem |

### CARD READER ERROR
| Code | Meaning |
|------|---------|
| CRC | Card reader disconnected |

### REFRIGERATION ERRORS
| Code | Meaning |
|------|---------|
| SENS | Temperature sensor problem |
| COLD | Temperature too cold |
| HOT | Temperature too hot |
| CMPR | Compressor not cooling |
| HEALTH | Health guard error |

---

# TROUBLESHOOTING

## XY Issues (Pages 34-36)

### No XY Movement
1. Check door switch is activated (pulled out position)
2. Verify XY is in home position
3. Check diagnostic lights:
   - Green (Y home) should be ON
   - Amber (X home) should be ON  
   - Red (picker home) should be ON
4. Check for obstructions
5. Check belt tension
6. Check motor connections

### XY Slams to Top/Right or Left
- Check home switches
- Check belt tension
- Check for damaged components

## Picker Cup Issues (Pages 42-43)

### Picker Cup Not Working
1. Check door switch
2. Check picker home switch (red light)
3. Check picker out switch
4. Test in Position Test mode (key 0 cycles plunger)
5. Check cup sensor if equipped

### Picker Cup at Wrong Location
- Adjust Y offset (Factory Diagnostics → 8)
- Adjust Hook Swipe X (Factory Diagnostics → 0)

---

# MACHINE SPECIFICATIONS

**Model:** BevMax 4 5800-4
**Type:** Glassfront cold drink vending machine

**Ambient Operating Temperature:**
- 75°F to 90°F (23°C to 32°C)
- Still air, 65% R.H. non-condensing

**Shelf Settings:**
- D2 = Domestic BevMax 4 5800-4 (default)
- E3 = Export 5 shelf
- E4 = Export 4 shelf

**Factory Defaults:**
- Shelf Location: D2 (code 700)
- Hook Swipe X: 91871
- Price: $99.95

---

# IMPORTANT NOTES

1. **Always close service door** when test vending (or open all the way)
2. **XY must be at home position** before running Position Test
3. **Pull door switch OUT** to power XY motors during diagnostics
4. **Never transport machine loaded with product**
5. **Indoor use only** - keep out of direct sunlight

---

*Knowledge base built from official Crane manual: bevmax-4-5800-4-generic-manual-62031.pdf*
*For VendiQ AI Troubleshooting Assistant*
