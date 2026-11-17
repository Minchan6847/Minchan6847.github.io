/*
 * All text on the site lives in this file.
 * Every string is written twice: L("English", "한국어").
 * To change wording, edit the text here and open a pull request. No other file needs to change.
 * Wrap tool commands or cell names in `backticks` to show them in a code font.
 */
const L = (en, ko) => ({ en, ko });

window.SITE = {
  profile: {
    name: L("Minchan Kim", "김민찬"),
    role: L("Digital IC design engineer, RTL to GDSII", "디지털 회로설계 엔지니어, RTL-to-GDSII"),
    summary: [
      L(
        "I design, verify and implement digital circuits, and I build the automation that tells me where a flow broke before I go looking.",
        "디지털 회로를 설계하고 검증하고 구현합니다. flow의 어느 단계가 왜 깨졌는지 먼저 알려주는 자동화 도구도 직접 만듭니다."
      ),
      L(
        "In a 960-hour Synopsys-based program I took the supplied RTL of an 8-bit CISC processor through to GDSII, then placed and routed a 51,000-cell multi-voltage SoC with zero setup, hold and DRC violations. Both projects started with a simulation full of X values, and both ended with the cause traced to a single cell.",
        "960시간 Synopsys 기반 교육과정에서 제공받은 8-bit CISC 프로세서 RTL을 GDSII까지 구현했고, 약 51,000 cell 규모의 multi-voltage SoC를 setup, hold, DRC violation 0으로 P&R했습니다. 두 프로젝트 모두 X로 가득 찬 simulation에서 시작해, 원인을 cell 하나까지 추적해 해결했습니다."
      )
    ],
    status: L(
      "Looking for an entry-level role in digital design in Korea: RTL design, physical implementation or physical design.",
      "RTL 설계, Physical Implementation, Physical Design 등 디지털 회로설계 신입 직무를 찾고 있습니다."
    ),
    email: "minchan1704@gmail.com",
    github: "https://github.com/Minchan6847"
  },

  /* Columns of the flow map. Order is the order of the design flow. */
  stages: [
    { id: "rtl", label: L("RTL design", "RTL 설계"), short: L("RTL", "RTL") },
    { id: "ver", label: L("Verification", "Verification"), short: L("Verif.", "검증") },
    { id: "syn", label: L("Synthesis and STA", "Synthesis · STA"), short: L("Synth.", "합성") },
    { id: "pnr", label: L("P&R and layout", "P&R · Layout"), short: L("P&R", "P&R") },
    { id: "sign", label: L("Sign-off", "Sign-off"), short: L("Sign-off", "Sign-off") },
    { id: "auto", label: L("Flow automation", "Flow 자동화"), short: L("Autom.", "자동화") }
  ],

  /* Projects with their own detail page. */
  projects: [
    {
      id: "orca",
      title: L("ORCA SoC: gate-level verification and multi-voltage P&R", "ORCA SoC: GLS 검증과 Multi-voltage P&R"),
      short: L("ORCA SoC", "ORCA SoC"),
      period: L("May to June 2026", "2026.05 ~ 2026.06"),
      context: L(
        "Final project of the KDT program. Top Award at the final hackathon.",
        "KDT 교육과정 파이널 프로젝트. 파이널 해커톤 최우수상."
      ),
      tools: "SAED 32nm, IC Compiler II, PrimeTime, Formality, StarRC, VCS, Verdi, UVM 1.2, UPF",
      stages: ["ver", "pnr", "sign", "auto"],
      summary: L(
        "Physical implementation of a 32-bit RISC SoC from a supplied synthesized netlist: about 51,000 standard cells, 40 SRAM macros, two supply rails and three asynchronous clock groups.",
        "제공받은 합성 netlist로 32-bit RISC SoC를 물리 구현했습니다. standard cell 약 51,000개, SRAM macro 40개, 전원 rail 2개, 비동기 clock group 3개 규모입니다."
      ),
      highlights: [
        L("Setup, hold and DRC violations all at 0 across six scenarios after routing", "Routing 이후 6개 scenario 전체에서 setup, hold, DRC violation 0"),
        L("An X on every system-domain register traced to one flop without a reset", "모든 system domain register의 X를 reset 없는 flop 하나로 추적"),
        L("A failing ECO traced to a library mismatch between P&R and STA", "실패하던 ECO의 원인을 P&R과 STA 간 library 불일치로 규명")
      ],
      facts: [
        [L("Design size", "설계 규모"), L("About 51,000 standard cells, 40 SRAM macros, core about 0.68 mm²", "standard cell 약 51,000개, SRAM macro 40개, core 약 0.68 mm²")],
        [L("Power intent", "Power intent"), L("UPF dual rail (VDD and VDDH) with level shifters", "UPF dual-rail(VDD/VDDH), level shifter 적용")],
        [L("Clocks", "Clock"), L("PCI 133 MHz, SYS_2x 417 MHz, SDRAM 244 MHz in three asynchronous groups", "PCI 133 MHz, SYS_2x 417 MHz, SDRAM 244 MHz (비동기 3 clock group)")],
        [L("Scenarios", "Scenario"), L("Six: functional and test modes at fast and slow corners", "6개: func/test mode × ff/ss corner")],
        [L("P&R result", "P&R 결과"), L("Setup and hold violations 0 in every scenario, DRC 0. LEC, LVS and physical checks clean.", "전 scenario setup/hold violation 0, DRC 0. LEC, LVS, physical check clean.")],
        [L("Open item", "남은 과제"), L("PrimeTime multi-scenario (DMSA) sign-off was not fully closed when the project ended.", "프로젝트 종료 시점에 PrimeTime DMSA sign-off는 완전히 닫지 못했습니다.")]
      ],
      sections: [
        {
          h: L("The reset that was never there", "처음부터 없었던 reset"),
          body: [
            L(
              "The first gate-level simulation never left the unknown state. Every register in the system clock domain stayed at X, so reset itself appeared to fail.",
              "첫 GLS는 unknown 상태에서 벗어나지 못했습니다. system clock domain의 모든 register가 X로 남아 reset 자체가 실패한 것처럼 보였습니다."
            ),
            L(
              "I worked through seven hypotheses, from uninitialized memories to a race in the SDRAM model, and ruled out six. The cause was the divide-by-two flop that generates the system clock. Synthesis had mapped it to `DFFX1`, a cell with no reset pin, so the X it held at time zero fed back through its own inverted output forever. With an unknown clock, nothing downstream could reset.",
              "초기화되지 않은 memory부터 SDRAM model의 race까지 7개 가설을 세워 6개를 기각했습니다. 원인은 system clock을 만드는 2분주 flop이었습니다. 합성 결과 reset pin이 없는 `DFFX1`로 mapping되어, t=0의 X가 자신의 반전 출력을 통해 영구히 되돌아왔습니다. clock이 unknown이니 그 뒤의 어떤 register도 reset되지 못했습니다."
            ),
            L(
              "The netlist was supplied and could not be resynthesized, so the fix was a one-line post-synthesis ECO: `DFFX1_LVT` became `DFFARX1_LVT` with its reset tied to the buffered reset net. That patched netlist became the input to place and route.",
              "netlist는 제공받은 것이라 재합성할 수 없었기 때문에, 한 줄짜리 post-synthesis ECO로 해결했습니다. `DFFX1_LVT`를 `DFFARX1_LVT`로 바꾸고 reset을 buffered reset net에 연결했습니다. 이 patched netlist가 P&R의 입력이 되었습니다."
            ),
            L(
              "Two more sources of X remained and I kept them separate in the write-up: 650 flops that have no reset by design, and zero-delay races that only real cell delays resolve. I also recorded that the clean result depended on the random seed instead of presenting one good run as the whole story.",
              "X의 원인은 두 가지가 더 있었고, 문서에서 따로 구분해 기록했습니다. 설계상 reset이 없는 flop 650개와, 실제 cell delay가 있어야 해소되는 zero-delay race입니다. 또 X가 없는 결과가 random seed에 따라 달라진다는 점도, 잘 나온 한 번의 결과로 덮지 않고 그대로 남겼습니다."
            )
          ]
        },
        {
          h: L("A UVM testbench around a netlist", "netlist를 감싼 UVM testbench"),
          body: [
            L(
              "I built a UVM 1.2 environment on the post-synthesis netlist with smoke, random, boundary, realistic, stress and error tests. The realistic test reached 89.37% toggle coverage across the design.",
              "post-synthesis netlist 위에 UVM 1.2 환경을 만들고 smoke, random, boundary, realistic, stress, error test를 구성했습니다. realistic test의 전체 toggle coverage는 89.37%였습니다."
            ),
            L(
              "The same runs produced the switching activity files for power analysis. Comparing two ways of picking the peak window showed that the obvious choice, the busiest bus burst, understated the chip's peak toggle density by about five times against a sliding-window search (11.8 against 58.9 toggles per nanosecond).",
              "같은 simulation에서 power 분석용 SAIF도 만들었습니다. peak 구간을 고르는 두 방법을 비교해 보니, 가장 바쁜 bus burst를 기준으로 잡으면 sliding window로 찾은 구간보다 chip의 peak toggle density를 약 5배 낮게 보게 된다는 것을 확인했습니다(11.8 대 58.9 toggle/ns)."
            )
          ]
        },
        {
          h: L("Place and route across two voltages", "두 전압에 걸친 P&R"),
          body: [
            L(
              "The RISC core runs on the higher rail and the rest of the chip on the lower one. I defined both domains in UPF, placed level shifters on every crossing and connected their secondary power in the layout.",
              "RISC core는 높은 전압 rail, 나머지는 낮은 전압 rail에서 동작합니다. UPF로 두 domain을 정의하고, domain을 건너는 모든 신호에 level shifter를 넣고, layout에서 secondary power까지 연결했습니다."
            ),
            L(
              "Timing was analyzed in six scenarios with parasitics extracted at four corners. For sign-off I set up scaling library groups in PrimeTime so that cells in the high-voltage domain are timed at their real 1.16 V instead of the default library voltage.",
              "timing은 6개 scenario에서 분석했고 parasitic은 4개 corner로 추출했습니다. sign-off에서는 PrimeTime에 scaling library group을 구성해, 높은 전압 domain의 cell이 기본 library 전압이 아닌 실제 1.16 V에서 분석되도록 했습니다."
            )
          ]
        },
        {
          h: L("When the ECO made timing worse", "ECO를 적용하자 timing이 나빠졌을 때"),
          body: [
            L(
              "PrimeTime produced an ECO that fixed its own violations. Applied in IC Compiler II, the same ECO broke setup badly: worst slack fell to -11.68 ns with 1,125 violating endpoints.",
              "PrimeTime이 만든 ECO는 PrimeTime 안에서는 violation을 해결했습니다. 그런데 같은 ECO를 IC Compiler II에 적용하자 setup이 크게 깨졌습니다. worst slack은 -11.68 ns, violating endpoint는 1,125개였습니다."
            ),
            L(
              "The two tools were not looking at the same cells. The physical library used for P&R had been characterized from different timing models than the ones PrimeTime read. I rebuilt the physical library from the sign-off timing models, and the ECO then did what it claimed: hold violations went from 15 to 0 and DRC violations from 57 to 8, with no setup degradation and a 0.9% power increase.",
              "두 tool이 같은 cell을 보고 있지 않았습니다. P&R에 쓰인 NDM이 PrimeTime이 읽는 `.db`와 다른 timing model로 만들어져 있었습니다. sign-off용 `.db`와 LEF로 NDM을 직접 다시 만들자 ECO가 의도대로 동작했습니다. hold violation은 15개에서 0개로, DRC violation은 57개에서 8개로 줄었고, setup 악화는 없었으며 power는 0.9% 늘었습니다."
            ),
            L(
              "A related mismatch affected the SRAMs. Their timing models were missing five power-management pins that the physical views and the netlist both had, which forced the memories to be treated as black boxes. I corrected the models so that Formality and PrimeTime link the real SRAM cells.",
              "SRAM에도 비슷한 불일치가 있었습니다. timing model에 power 관리용 pin 5개가 빠져 있어서(NDM과 netlist에는 있음) SRAM을 blackbox로 처리할 수밖에 없었습니다. model을 교정해 Formality와 PrimeTime이 실제 SRAM cell을 link하도록 했습니다."
            )
          ]
        },
        {
          h: L("Working with an AI agent under review", "AI 에이전트와 검토 기반으로 일하기"),
          body: [
            L(
              "Design changes and documentation went through GitHub pull requests written by an AI coding agent and reviewed by me, more than 37 in the simulation phase alone. I defined each task, read every diff and decided what merged.",
              "설계 변경과 문서화는 AI 코딩 에이전트가 GitHub pull request로 만들고 제가 검토하는 방식으로 진행했습니다. simulation 단계에서만 37건이 넘습니다. 작업은 제가 정의했고, 모든 변경 내역을 읽은 뒤 반영 여부를 결정했습니다."
            ),
            L(
              "One rule kept the results trustworthy: any tool command that was not already in the code had to be checked against the tool's own manual, by running the tool, before it went into a script.",
              "결과의 신뢰성을 지키기 위해 한 가지 규칙을 두었습니다. 코드에 없던 tool command는 script에 넣기 전에 반드시 해당 tool을 실행해 manual로 확인하게 했습니다."
            )
          ]
        }
      ],
      repos: [
        { name: "KDT_ORCA", url: "https://github.com/Minchan6847/KDT_ORCA", private: true }
      ]
    },

    {
      id: "cisc",
      title: L("8-bit CISC processor: RTL to GDSII", "8-bit CISC 프로세서: RTL-to-GDSII"),
      short: L("8-bit CISC processor", "8-bit CISC 프로세서"),
      period: L("March to May 2026", "2026.03 ~ 2026.05"),
      context: L("First project of the KDT program.", "KDT 교육과정 첫 번째 프로젝트."),
      tools: "SAED 32nm, Design Compiler, IC Compiler II, PrimeTime, Formality, StarRC, VCS, Verdi",
      stages: ["ver", "syn", "pnr", "sign", "auto"],
      summary: L(
        "The full implementation flow for an 8-bit CISC processor with a 714 MHz target (1.4 ns period). The RTL was supplied. I analyzed it, then took it through synthesis, place and route, and sign-off.",
        "8-bit CISC 프로세서를 714 MHz(주기 1.4 ns) 목표로 구현했습니다. 제공받은 RTL을 분석한 뒤 합성, P&R, sign-off까지 전 과정을 수행했습니다."
      ),
      highlights: [
        L("All sign-off items met: timing, DRC, LVS, LEC, multi-Vth and max fanout", "timing, DRC, LVS, LEC, multi-Vth, max fanout 등 sign-off 항목 전체 충족"),
        L("An X on every register traced to one overloaded clock inverter", "모든 register의 X를 과부하된 clock inverter 하나로 추적"),
        L("Six-scenario constraints replacing a single-scenario setup", "단일 scenario 합성을 6개 MCMM scenario로 전환")
      ],
      facts: [
        [L("Starting point", "시작점"), L("RTL supplied by the program. I analyzed it and drew its timing diagrams before synthesis.", "교육과정에서 제공받은 RTL. 합성 전에 RTL을 분석하고 timing diagram을 작성")],
        [L("Target", "목표"), L("714 MHz (1.4 ns clock period)", "714 MHz (clock 주기 1.4 ns)")],
        [L("Scenarios", "Scenario"), L("Six: 0.78 V, 0.85 V and 1.05 V, each for setup and hold", "6개: 0.78 V / 0.85 V / 1.05 V × setup/hold")],
        [L("LVT cell ratio", "LVT cell 비율"), L("17.86% against a limit of 25%", "17.86% (spec 25% 이하)")],
        [L("Sign-off", "Sign-off"), L("Setup and hold timing, DRC, LVS, Formality LEC, multi-Vth and max fanout all met", "setup/hold timing, DRC, LVS, Formality LEC, multi-Vth, max fanout 충족")]
      ],
      sections: [
        {
          h: L("An X on every register", "모든 register에 퍼진 X"),
          body: [
            L(
              "In pre-layout gate-level simulation every register went to X. Walking the path backwards led to `n_clk`, the inverter that generates the inverted clock. Its falling delay was 0.855 ns, longer than the 0.7 ns half period.",
              "pre-layout GLS에서 모든 register가 X가 되었습니다. 경로를 거슬러 올라가니 반전 clock을 만드는 inverter `n_clk`에 도달했습니다. falling delay가 0.855 ns로 반주기 0.7 ns보다 길었습니다."
            ),
            L(
              "The delay came from load. The inverter was driving 57 flops, a 57.7 fF load, which I confirmed in the SDF and the net attributes. Synthesis does not fix design-rule violations on the clock network because clock tree synthesis rebuilds that network later and absorbs the delay.",
              "delay의 원인은 부하였습니다. 이 inverter는 flop 57개, 57.7 fF의 부하를 구동하고 있었고, SDF와 net 속성에서 이를 확인했습니다. 합성 단계에서는 clock network의 DRC를 고치지 않습니다. P&R의 CTS가 clock tree를 다시 만들면서 이 delay를 흡수하기 때문입니다."
            ),
            L(
              "On that basis I simulated with a modified SDF that excludes this one inverter's delay. Setup and hold simulations then passed, which verified the netlist's function without hiding a real problem.",
              "이를 근거로 해당 inverter의 delay만 제외한 modified SDF로 simulation했습니다. setup, hold GLS가 모두 통과해, 실제 문제를 가리지 않고 netlist의 기능 정합성을 검증했습니다."
            )
          ]
        },
        {
          h: L("Constraints that match sign-off", "sign-off와 맞는 constraint"),
          body: [
            L(
              "The starting point was synthesis in a single scenario. Setup is critical at low voltage and hold at high voltage, so I moved to six scenarios: three voltages, each for setup and hold. Synthesis and place and route then optimized against the same conditions that sign-off would check.",
              "처음에는 단일 scenario로 합성하고 있었습니다. setup은 낮은 전압, hold는 높은 전압에서 critical하다는 원리에 따라 3개 전압 × setup/hold의 6개 scenario로 전환했습니다. 이로써 합성과 P&R이 sign-off에서 확인할 조건과 같은 조건으로 최적화하게 되었습니다."
            ),
            L(
              "A second synthesis pass that reads the real floorplan brought the share of low-threshold cells within its limit, ending at 17.86% against 25%.",
              "실제 floorplan을 반영하는 2nd-pass synthesis로 LVT cell 비율을 spec 안으로 맞췄고, 최종 17.86%(spec 25% 이하)였습니다."
            )
          ]
        },
        {
          h: L("Physically aware ECO for sign-off", "sign-off를 위한 physically-aware ECO"),
          body: [
            L(
              "The last violations were closed with PrimeTime multi-scenario analysis, looking at the setup-critical and hold-critical scenarios together. PrimeTime generated the ECO using the placement and the free sites from IC Compiler II, and IC Compiler II applied it with minimum physical impact.",
              "남은 violation은 PrimeTime DMSA로 setup critical scenario와 hold critical scenario를 동시에 분석해 해결했습니다. PrimeTime이 IC Compiler II의 배치 정보와 open site를 고려해 ECO를 만들고, IC Compiler II가 minimum physical impact로 적용하는 흐름입니다."
            )
          ]
        }
      ],
      repos: [
        { name: "KDT_CISC", url: "https://github.com/Minchan6847/KDT_CISC", private: true }
      ]
    },

    {
      id: "orchestrator",
      title: L("RTL-to-GDSII Orchestrator", "RTL-to-GDSII Orchestrator"),
      short: L("Flow Orchestrator", "Flow Orchestrator"),
      period: L("March to June 2026", "2026.03 ~ 2026.06"),
      context: L(
        "A tool I built outside the assignment scope, used on both the CISC and ORCA projects.",
        "과제 범위 밖에서 직접 만든 도구로, CISC와 ORCA 두 프로젝트에 모두 사용했습니다."
      ),
      tools: "Python, Tkinter, SQLite, Tcl, Shell",
      stages: ["auto"],
      summary: L(
        "A desktop tool that runs a 25-stage implementation flow in order, reads every log and report, and decides pass or fail for each stage.",
        "25개 stage의 구현 flow를 순서대로 실행하고, 모든 log와 report를 읽어 stage별 PASS/FAIL을 판정하는 데스크톱 도구입니다."
      ),
      highlights: [
        L("Full CISC flow, 25 stages, in 8 minutes 45 seconds", "CISC 전체 flow(25 stage)를 8분 45초에 실행"),
        L("Pass or fail decided by rules I defined for each tool", "tool별로 직접 정의한 규칙으로 PASS/FAIL 자동 판정"),
        L("21 PPA metrics stored per run for comparison", "실행마다 21개 PPA 지표를 저장해 비교")
      ],
      facts: [
        [L("Flow", "Flow"), L("25 stages across Design Compiler, IC Compiler II, StarRC, PrimeTime, Formality and VCS", "Design Compiler, IC Compiler II, StarRC, PrimeTime, Formality, VCS에 걸친 25 stage")],
        [L("Run time", "실행 시간"), L("8 minutes 45 seconds for the full CISC flow", "CISC 전체 flow 8분 45초")],
        [L("Metrics", "지표"), L("21 PPA metrics per design cycle, stored in SQLite", "cycle마다 21개 PPA 지표를 SQLite에 저장")],
        [L("Reuse", "재사용"), L("Used again on ORCA with light tuning", "약간의 튜닝만으로 ORCA 프로젝트에 재사용")]
      ],
      sections: [
        {
          h: L("Why I built it", "만든 이유"),
          body: [
            L(
              "One design iteration meant running 25 stages by hand across six tools, each with its own directory, inputs and outputs, then searching the reports for the numbers that mattered. Most of my time went to that repetition instead of to design decisions, so I automated it.",
              "설계를 한 번 반복하려면 6개 tool에 걸친 25개 stage를 손으로 실행하고, report에서 필요한 수치를 일일이 찾아야 했습니다. tool마다 디렉토리와 입출력도 달랐습니다. 시간 대부분이 설계 판단이 아니라 이 반복에 쓰여서 자동화했습니다."
            )
          ]
        },
        {
          h: L("Judging, not only running", "실행이 아니라 판정의 자동화"),
          body: [
            L(
              "Running stages in order is the easy part. The work went into deciding whether a stage really passed. Each tool has its own parser and its own rules, which I wrote from what a sign-off engineer would check.",
              "stage를 순서대로 실행하는 것은 쉬운 부분입니다. 공을 들인 것은 stage가 정말 통과했는지 판정하는 일이었습니다. tool마다 별도의 parser와 규칙을 두었고, sign-off에서 확인하는 항목을 기준으로 직접 작성했습니다."
            )
          ],
          list: [
            L("Routing: via conversion rate at least 95%, no open nets, no DRC and no antenna violations from `check_routes`", "Routing: `check_routes`의 via conversion rate 95% 이상, open net 0, DRC 0, antenna violation 0"),
            L("Layout: no shorts or floating routes from `check_lvs`, clean power grid from `check_pg_drc`, legal placement from `check_legality`", "Layout: `check_lvs`의 short와 floating route 0, `check_pg_drc` clean, `check_legality` 통과"),
            L("Multi-voltage: zero errors and warnings from `check_mv_design`", "Multi-voltage: `check_mv_design` error와 warning 0"),
            L("Equivalence: Formality must report a successful verification with no failing points", "Equivalence: Formality가 failing point 없이 verification 성공을 보고해야 함"),
            L("Timing: after the ECO, no remaining violators in the multi-scenario report", "Timing: ECO 이후 multi-scenario report에 남은 violator 없음")
          ]
        },
        {
          h: L("Comparing runs", "실행 간 비교"),
          body: [
            L(
              "Each run stores 21 metrics, including setup and hold timing, DRC count and power per scenario. Metrics with different units, such as power in microwatts and the low-threshold cell ratio in percent, are drawn on two axes so one chart shows how a change moved both.",
              "실행마다 setup/hold timing, DRC count, scenario별 power 등 21개 지표를 저장합니다. 전력(µW)과 LVT 비율(%)처럼 단위가 다른 지표는 이중 축 그래프로 그려, 한 번의 변경이 둘을 어떻게 움직였는지 한 화면에서 볼 수 있게 했습니다."
            ),
            L(
              "I wrote it with an AI assistant over about thirty rounds of request, test and debugging. I defined the checks and verified each one against real reports myself.",
              "AI 어시스턴트와 요청, 검증, 디버깅을 약 30회 반복하며 만들었습니다. 판정 항목은 제가 정의했고, 각 항목을 실제 report로 직접 검증했습니다."
            )
          ]
        }
      ],
      repos: [
        { name: "KDT_CISC / cisc_orchestrator", url: "https://github.com/Minchan6847/KDT_CISC/tree/main/cisc_orchestrator", private: true },
        { name: "KDT_ORCA / orca_orchestrator", url: "https://github.com/Minchan6847/KDT_ORCA/tree/main/orca_orchestrator", private: true }
      ]
    },

    {
      id: "kist",
      title: L("SPAD image sensor chip and a chip measurement system", "SPAD 이미지센서 칩 설계와 칩 측정 시스템"),
      short: L("SPAD image sensor (KIST)", "SPAD 이미지센서 (KIST)"),
      period: L("June to December 2021", "2021.06 ~ 2021.12"),
      context: L(
        "Internship in a circuit design lab at the Korea Institute of Science and Technology (KIST).",
        "한국과학기술연구원(KIST) 회로설계 연구실 현장실습."
      ),
      tools: "TSMC 180nm, Cadence Virtuoso, Verilog, Opal Kelly FPGA, Python",
      stages: ["rtl", "ver", "pnr"],
      summary: L(
        "Design and layout of digital blocks for a SPAD-based 3D ranging image sensor in TSMC 180 nm, and a measurement setup for a second chip.",
        "TSMC 180nm 공정의 SPAD 기반 3D 거리 이미지센서 칩에서 디지털 block을 설계하고 layout했으며, 다른 칩의 측정 환경을 구축했습니다."
      ),
      highlights: [
        L("Time-to-digital converter area reduced by about 43%", "TDC 면적 약 43% 축소"),
        L("Top-level and pad ring layout clean on DRC and LVS", "top과 pad ring 통합 layout DRC, LVS clean"),
        L("Test board, FPGA code and a Python GUI for chip measurement", "칩 측정용 test board, FPGA 코드, Python GUI 구축")
      ],
      facts: [
        [L("Process", "공정"), L("TSMC 180 nm", "TSMC 180nm")],
        [L("My blocks", "담당 block"), L("Time-to-digital converter, histogram builder, R2R DAC, 13-bit 100-to-1 multiplexer, clock generator, pad ring", "TDC, Histogram Builder, R2R DAC, 13-bit 100-to-1 MUX, clock generator, pad ring")],
        [L("Top level", "Top"), L("100 by 100 pixel array, readout and histogram generator", "100×100 pixel array, read-out, histogram generator")]
      ],
      sections: [
        {
          h: L("Sensor chip", "센서 칩"),
          body: [
            L(
              "I was responsible for the time-to-digital converter, which measures photon arrival time, from design through verification. I also designed and laid out the histogram builder (a state machine), an R2R DAC, a 13-bit 100-to-1 multiplexer, the clock generator and the pad ring.",
              "광자 도달 시간을 측정하는 TDC의 설계와 검증을 담당했습니다. Histogram Builder(FSM), R2R DAC, 13-bit 100-to-1 MUX, clock generator, pad ring도 설계하고 layout했습니다."
            ),
            L(
              "The first converter came from synthesized logic. Redesigning it at gate level cut its area by about 43%.",
              "처음 TDC는 합성된 logic이었습니다. 이를 gate-level 설계로 바꿔 면적을 약 43% 줄였습니다."
            ),
            L(
              "In Cadence Virtuoso I integrated the top level with the pad ring and brought the full layout to clean DRC and LVS.",
              "Cadence Virtuoso로 top과 pad ring을 통합하고, 전체 layout을 DRC, LVS clean까지 완료했습니다."
            )
          ]
        },
        {
          h: L("Measurement system", "측정 시스템"),
          body: [
            L(
              "For a chip that records electrical and fluorescence signals from the brain, I designed, ordered and soldered the test board, wrote the Verilog for an Opal Kelly FPGA module that drives the chip, and built the Python front end used to run measurements.",
              "뇌의 전기 신호와 형광 신호를 측정하는 칩을 위해 test board를 설계, 발주, 납땜했고, 칩을 구동하는 Opal Kelly FPGA용 Verilog 코드와 측정에 쓰는 Python GUI를 만들었습니다."
            )
          ]
        }
      ],
      repos: [
        { name: "MeasuringSystem_AMS_CL", url: "https://github.com/Minchan6847/MeasuringSystem_AMS_CL", private: true },
        { name: "Measurement", url: "https://github.com/Minchan6847/Measurement", private: true },
        { name: "C2D", url: "https://github.com/Minchan6847/C2D", private: true }
      ]
    },

    {
      id: "digital-ip",
      title: L("Digital IP set: pipelined CPU, cache and DDR controller", "Digital IP 설계: pipeline CPU, cache, DDR controller"),
      short: L("Digital IP set", "Digital IP 설계"),
      period: L("July to August 2026", "2026.07 ~ 2026.08"),
      context: L(
        "Self-study alongside an online course on computer architecture and SoC protocols.",
        "Computer Architecture와 SoC 프로토콜 온라인 강의와 병행한 개인 학습 프로젝트."
      ),
      tools: "Verilog, SystemVerilog, Quartus Prime Lite 20.1",
      stages: ["rtl", "ver"],
      summary: L(
        "RTL for the core blocks of a small computer system, each written, simulated, synthesized and documented with block diagrams, state diagrams and waveforms.",
        "작은 컴퓨터 시스템의 핵심 block을 RTL로 설계했습니다. 모듈마다 simulation과 합성을 수행하고 block diagram, state diagram, 파형과 함께 문서화했습니다."
      ),
      highlights: [
        L("Five-stage pipelined MIPS CPU with forwarding, stall and flush", "forwarding, stall, flush를 갖춘 5-stage pipeline MIPS CPU"),
        L("DDR4-style controller with timing parameters and burst access", "timing parameter와 burst를 구현한 DDR4-style controller"),
        L("CRC and Hamming blocks for detecting and correcting errors", "오류 검출과 정정을 위한 CRC, Hamming block")
      ],
      facts: [
        [L("Processor", "Processor"), L("Five-stage MIPS pipeline, built twice: without and with hazard handling", "5-stage MIPS pipeline (hazard 미처리 버전, 처리 버전)")],
        [L("Memory", "Memory"), L("Direct-mapped write-back cache, two-port and dual-port SRAM models, DDR4-style controller", "direct-mapped write-back cache, two-port/dual-port SRAM model, DDR4-style controller")],
        [L("Data integrity", "Data integrity"), L("Byte-parallel CRC-16-CCITT generator, Hamming (21,16) encoder and decoder", "byte-parallel CRC-16-CCITT, Hamming (21,16) encoder/decoder")],
        [L("Interfaces", "Interface"), L("Synchronous FIFO, asynchronous FIFO, APB register block", "sync FIFO, async FIFO, APB register block")]
      ],
      sections: [
        {
          h: L("The same CPU, twice", "같은 CPU를 두 번"),
          body: [
            L(
              "The first version has no hazard logic. The program has to keep dependent instructions four slots apart and pad three no-ops after every branch. The second version adds a forwarding unit, load-use stall detection and a flush of the fetch stage, and moves branch resolution forward so the branch penalty drops from three cycles to one.",
              "첫 버전에는 hazard 처리 logic이 없습니다. 프로그램이 의존 관계의 명령어를 4칸 띄우고 분기 뒤에 NOP 3개를 넣어야 합니다. 두 번째 버전에는 forwarding unit, load-use stall 검출, IF flush를 추가했고, 분기 판단을 ID stage로 앞당겨 branch penalty를 3 cycle에서 1 cycle로 줄였습니다."
            ),
            L(
              "Putting the two side by side shows which restriction each piece of hazard logic removes.",
              "두 버전을 나란히 놓으면 각 hazard logic이 어떤 제약을 없애는지가 드러납니다."
            )
          ]
        },
        {
          h: L("Memory and data integrity", "Memory와 data integrity"),
          body: [
            L(
              "The cache handles variable memory latency with a request and acknowledge handshake. The DDR controller implements the activate, read or write, precharge sequence as a state machine with timing parameters, data strobes, eight-beat bursts and an open-page policy.",
              "cache는 req/ack handshake로 memory의 가변 지연을 처리합니다. DDR controller는 ACT, WR/RD, PRE 순서를 FSM으로 구현하고 timing parameter, DQS strobe, BL8 burst, open-page 정책을 포함합니다."
            ),
            L(
              "For the CRC generator I compared five implementations, from hand calculation to a serial shift register to the unrolled parallel form.",
              "CRC는 손계산부터 직렬 LFSR, 병렬 unroll까지 5가지 구현을 비교했습니다."
            )
          ]
        }
      ],
      repos: [
        { name: "SAM_Digital_Circuit_Design", url: "https://github.com/Minchan6847/SAM_Digital_Circuit_Design", private: false }
      ]
    },
    {
      id: "cap",
      title: L("Disaster alert system on the Common Alerting Protocol", "CAP 표준 기반 재난경보 시스템"),
      short: L("CAP alert system", "CAP 재난경보 시스템"),
      period: L("September to December 2020", "2020.09 ~ 2020.12"),
      context: L(
        "Solo semester project in the Software System Lab course, third year at the University of Seoul.",
        "서울시립대학교 3학년 2학기 소프트웨어시스템실습 과목에서 한 학기 동안 수행한 개인 프로젝트."
      ),
      tools: "Node.js, Express, EJS, Oracle Database, Leaflet, jQuery, Bootstrap, Flutter (Dart)",
      stages: [],
      summary: L(
        "A full-stack system for the Common Alerting Protocol (CAP), the international XML standard for emergency alerts: a web editor to write an alert, a server that stores it, and a mobile app that shows it.",
        "재난경보 국제 표준인 CAP(Common Alerting Protocol)를 다루는 full stack 시스템입니다. 경보를 작성하는 웹, 저장하는 서버, 표출하는 모바일 앱으로 구성됩니다."
      ),
      highlights: [
        L("Web editor covering every CAP element across four screens", "CAP의 모든 요소를 4개 화면에서 입력하는 작성 웹"),
        L("Affected areas drawn on a map as polygons or circles", "지도에 polygon, circle로 피해 지역을 그려서 입력"),
        L("Flutter app that lists alerts and shows image and area detail", "경보 목록과 이미지, 지역 등 세부사항을 보여주는 Flutter 앱")
      ],
      facts: [
        [L("Editor", "작성 웹"), L("Four screens in CAP order: Header, Info, Resource, Area", "CAP 구조 순서의 4개 화면: Header, Info, Resource, Area")],
        [L("Server", "서버"), L("Node.js with Express. Stores each alert in an Oracle database and as a CAP XML file.", "Node.js(Express). 경보를 Oracle DB와 CAP XML 파일로 저장")],
        [L("App", "앱"), L("Flutter. Fetches the XML over HTTP, parses it, and shows a list and a detail view.", "Flutter. HTTP로 XML을 받아 parsing한 뒤 목록과 세부 화면으로 표출")],
        [L("Environment", "개발 환경"), L("Oracle Database 11g Express Edition on Ubuntu 20.04, web server on macOS, app on the iPhone 12 Pro Max simulator", "Ubuntu 20.04의 Oracle Database 11g XE, macOS 웹서버, iPhone 12 Pro Max simulator")]
      ],
      sections: [
        {
          h: L("Writing an alert", "경보 작성"),
          body: [
            L(
              "The editor walks through the four parts of a CAP message with Previous and Next buttons. Every element of the standard has an input.",
              "작성 웹은 Previous, Next 버튼으로 CAP 메시지의 네 부분을 차례로 이동하며 입력합니다. 표준의 모든 요소에 입력란이 있습니다."
            ),
            L(
              "On the Resource screen, choosing an image or audio file encodes it to base64 in the browser, fills the `derefUri` element and shows a preview, so the file travels inside the alert itself.",
              "Resource 화면에서 이미지나 오디오 파일을 선택하면 브라우저에서 base64로 encoding해 `derefUri` 요소에 자동 입력하고 미리보기를 보여줍니다. 파일이 경보 안에 직접 담깁니다."
            ),
            L(
              "On the Area screen the affected region is drawn on a Leaflet map as a polygon or a circle, and the coordinates fill the form. Clicking a saved alert in the list loads its shapes back onto the map through an AJAX request, so an earlier area can be reused.",
              "Area 화면에서는 Leaflet 지도에 polygon이나 circle로 피해 지역을 그리면 좌표가 입력란에 채워집니다. 목록에서 기존 경보를 클릭하면 AJAX 요청으로 그 도형을 지도에 다시 불러와, 이전 지역 정보를 재사용할 수 있습니다."
            )
          ]
        },
        {
          h: L("Server and storage", "서버와 저장"),
          body: [
            L(
              "The form is posted to the Express server, which inserts the area record into Oracle and rebuilds the flat form fields into the nested CAP structure (`alert`, `info`, `resource`, `area`). Empty fields are dropped, and the result is written as a standard XML file with `js2xmlparser`.",
              "입력 form은 Express 서버로 post됩니다. 서버는 area 정보를 Oracle DB에 insert하고, 평면적인 form 항목을 CAP의 계층 구조(`alert`, `info`, `resource`, `area`)로 다시 묶습니다. 빈 항목은 제외하고 `js2xmlparser`로 표준 XML 파일을 만듭니다."
            ),
            L(
              "A separate route returns every stored XML file as JSON for the mobile app.",
              "별도의 route가 저장된 모든 XML 파일을 JSON으로 묶어 모바일 앱에 전달합니다."
            )
          ]
        },
        {
          h: L("Presenter app", "표출 앱"),
          body: [
            L(
              "The Flutter app loads all alerts from the server on start, parses the XML, and lists each one with its headline, description, date and time. Tapping an alert opens a detail view with the image decoded from `derefUri` and the description of the receiving area.",
              "Flutter 앱은 시작할 때 서버에서 모든 경보를 받아 XML을 parsing하고, 제목, 본문, 날짜와 시간을 목록으로 보여줍니다. 경보를 누르면 `derefUri`에서 decoding한 이미지와 수신 지역 설명이 포함된 세부 화면으로 이동합니다."
            ),
            L(
              "Audio playback and filtering alerts by the user's region were planned but not implemented.",
              "오디오 재생과 사용자 지역에 따른 경보 filtering은 계획했지만 구현하지 못했습니다."
            )
          ]
        }
      ],
      repos: [
        { name: "CAP_System", url: "https://github.com/Minchan6847/CAP_System", private: false },
        { name: "CAP_Presenter", url: "https://github.com/Minchan6847/CAP_Presenter", private: false }
      ],
      report: { path: "docs/cap-system-final-report.pdf", label: L("Final report (PDF, in Korean)", "최종보고서 (PDF)") }
    },

    {
      id: "analog-computer",
      title: L("Analog computer for linear differential equations", "선형미분방정식을 푸는 아날로그 컴퓨터"),
      short: L("Analog computer", "아날로그 컴퓨터"),
      period: L("Spring 2019", "2019년 1학기"),
      context: L(
        "Final project of Electrical and Computer Engineering Design Lab I, second year at the University of Seoul.",
        "서울시립대학교 2학년 1학기 전자전기컴퓨터설계실험1 과목의 final project."
      ),
      tools: "NE555, 74HC74, 74HC93, LM324, ATmega8A, CD4511, oscilloscope",
      stages: [],
      summary: L(
        "A hand-soldered board that generates a 0.1 Hz square wave and solves first- and second-order linear differential equations with op-amp circuits. A microcontroller seconds counter was added as an option.",
        "직접 납땜한 기판에서 0.1 Hz square wave를 만들고, OP-Amp 회로로 1계, 2계 선형미분방정식의 해를 구합니다. option으로 마이크로컨트롤러 기반 초 counter를 추가했습니다."
      ),
      highlights: [
        L("A 0.8 Hz oscillator divided down to a 0.1 Hz, 50% duty square wave", "0.8 Hz oscillator를 분주해 0.1 Hz, duty cycle 50%의 square wave 생성"),
        L("One six-op-amp circuit switched between first and second order", "OP-Amp 6개로 1계와 2계를 switch로 전환하는 통합 회로"),
        L("Under-damped and over-damped responses measured on an oscilloscope", "under-damped, over-damped 응답을 oscilloscope로 측정")
      ],
      facts: [
        [L("Oscillator", "Oscillator"), L("555 timer in astable mode with 100 kΩ, 40.18 kΩ and 10 µF, about 0.8 Hz", "555 timer astable mode (100 kΩ, 40.18 kΩ, 10 µF), 약 0.8 Hz")],
        [L("Divider", "Frequency divider"), L("Three D flip-flops and a modulo-16 counter, each giving 1/2, 1/4 and 1/8", "D flip-flop 3개와 modulo-16 counter로 각각 1/2, 1/4, 1/8 분주")],
        [L("First order", "1계"), L("y′ + 2y = u", "y′ + 2y = u")],
        [L("Second order", "2계"), L("y″ + 2y′ + 4y = u (under-damped) and y″ + 2.5y′ + y = u (over-damped)", "y″ + 2y′ + 4y = u (under-damped), y″ + 2.5y′ + y = u (over-damped)")],
        [L("Input", "입력"), L("u is the 0.1 Hz square wave with a 50% duty cycle", "u는 0.1 Hz, duty cycle 50%의 square wave")]
      ],
      sections: [
        {
          h: L("A slow, clean clock", "느리고 깨끗한 clock"),
          body: [
            L(
              "A 555 timer alone gives a pulse train whose duty cycle is not 50%. Feeding it to a D flip-flop with its inverted output tied back to its input halves the frequency and fixes the duty cycle at 50%. Three flip-flops in a row divide the 0.8 Hz output down to 0.1 Hz.",
              "555 timer만으로는 duty cycle이 50%가 아닌 pulse가 나옵니다. D flip-flop의 반전 출력을 입력에 되먹이면 주파수가 절반이 되고 duty cycle이 50%로 맞춰집니다. flip-flop 3개를 이어 0.8 Hz 출력을 0.1 Hz로 분주했습니다."
            ),
            L(
              "The same division was built a second way with a 74HC93 counter, and both versions were measured at 1/2, 1/4 and 1/8 of the input frequency.",
              "같은 분주를 74HC93 counter로도 구현했고, 두 방식 모두 입력 주파수의 1/2, 1/4, 1/8 출력을 측정했습니다."
            )
          ]
        },
        {
          h: L("Solving the equations", "방정식 풀이"),
          body: [
            L(
              "Each equation is rearranged so that the highest derivative equals a sum of the input and the lower terms. Summing amplifiers form that sum and integrators turn it back into the lower derivatives, which closes the loop.",
              "각 방정식을 최고계 도함수가 입력과 낮은 계 항들의 합이 되도록 정리합니다. summing amplifier가 그 합을 만들고 integrator가 이를 다시 낮은 계 도함수로 바꿔 loop를 닫습니다."
            ),
            L(
              "I designed the first-order and second-order solvers as one circuit using six op-amps in two LM324 packages. Two slide switches choose which equation the circuit solves, and variable resistors set the coefficients.",
              "1계와 2계 회로를 LM324 2개, OP-Amp 6개만으로 하나의 회로로 통합 설계했습니다. slide switch 2개로 어떤 방정식을 풀지 선택하고, 가변저항으로 계수를 맞춥니다."
            ),
            L(
              "With the 0.1 Hz square wave as the input, the oscilloscope showed the expected exponential response for the first-order case, ringing for the under-damped case and a slow settle for the over-damped case.",
              "0.1 Hz square wave를 입력으로 넣었을 때, oscilloscope에서 1계는 지수 응답, under-damped는 ringing, over-damped는 느린 수렴을 확인했습니다."
            )
          ]
        },
        {
          h: L("Seconds counter", "초 counter"),
          body: [
            L(
              "An ATmega8A counts from 0 to 99, one step per second, and repeats. It sends each digit as 4-bit BCD to a CD4511 decoder that drives a two-digit seven-segment display.",
              "ATmega8A가 0부터 99까지 1초마다 증가하는 것을 반복합니다. 각 자릿수를 4-bit BCD로 CD4511 decoder에 보내 2-digit 7-segment를 구동합니다."
            ),
            L(
              "Two 2N7000 transistors select which digit is on. The firmware alternates between the digits every millisecond, which makes both appear lit at once.",
              "2N7000 transistor 2개가 켜질 자릿수를 선택합니다. firmware가 1 ms마다 두 자릿수를 번갈아 켜서 동시에 켜진 것처럼 보이게 합니다."
            )
          ]
        }
      ],
      repos: [],
      report: { path: "docs/ecd-lab1-final-project-report.pdf", label: L("Final project report (PDF, in Korean)", "Final project 보고서 (PDF)") }
    }
  ],

  /* Shorter entries shown as a list on the home page. `stages` places them on the flow map when it applies. */
  otherWork: [
    {
      title: L("FPGA design exercises on a Zybo Z7-20", "Zybo Z7-20 FPGA 설계 실습"),
      period: L("January 2026", "2026.01"),
      stages: ["rtl", "ver"],
      inMap: true,
      short: L("FPGA exercises", "FPGA 실습"),
      repo: { url: "https://github.com/Minchan6847/KDT_Vivado", private: true },
      text: L(
        "A digital watch, a keypad calculator debugged with an integrated logic analyzer, an 8-tap fully parallel FIR filter with Baugh-Wooley signed multipliers, and UART transmit and receive, built in Vivado.",
        "Digital watch, ILA로 디버깅한 keypad 계산기, Baugh-Wooley signed multiplier를 쓴 8-tap full parallel FIR filter, UART TX/RX를 Vivado로 설계했습니다."
      )
    },
    {
      title: L("SystemVerilog and UVM verification study", "SystemVerilog · UVM 검증 학습"),
      period: L("May 2026", "2026.05"),
      stages: ["ver"],
      inMap: true,
      short: L("UVM study", "UVM 학습"),
      repo: { url: "https://github.com/Minchan6847/DV_Study", private: true },
      text: L(
        "Testbench practice in SystemVerilog and UVM, starting from a 4-bit adder.",
        "4-bit adder부터 시작한 SystemVerilog, UVM testbench 학습입니다."
      )
    },
    {
      title: L("Driver monitoring robot", "운전자 모니터링 로봇"),
      period: L("August 2020", "2020.08"),
      text: L(
        "A hackathon prototype that measures alcohol level with a gas sensor and uses face recognition to check that the driver is watching the road. Encouragement Award.",
        "알코올 센서로 음주 수치를 측정하고 얼굴 인식으로 전방 주시를 확인하는 해커톤 시제품입니다. 장려상을 받았습니다."
      )
    },
    {
      title: L("Autonomous model car software", "자율주행 모형자동차 소프트웨어"),
      repo: { url: "https://github.com/Minchan6847/Zetive_Run", private: true },
      period: L("May to December 2019", "2019.05 ~ 2019.12"),
      text: L(
        "Team of five in the Embedded Software Contest. We wrote the driving software for a supplied model car to complete course missions.",
        "임베디드 SW 경진대회에 5인 팀으로 참가해, 제공받은 모형 자동차가 경기장 미션을 수행하는 주행 소프트웨어를 개발했습니다."
      )
    },
    {
      title: L("IoT devices for a smart room", "스마트룸 IoT 기기"),
      period: L("September to December 2019", "2019.09 ~ 2019.12"),
      text: L(
        "Team of five. We built a door lock, a light switch and an air conditioner remote as connected devices.",
        "5인 팀으로 도어락, 전등 스위치, 에어컨 리모컨을 IoT 기기로 제작했습니다."
      )
    },
    {
      title: L("Humanoid robot vision software", "휴머노이드 로봇 영상인식 소프트웨어"),
      period: L("March to October 2018", "2018.03 ~ 2018.10"),
      text: L(
        "Team of six in the Intelligent SoC Robot War. We wrote software for a humanoid to recognize obstacles from camera images and clear a course on its own.",
        "지능형 SoC 로봇워(HURO-Competition)에 6인 팀으로 참가해, 휴머노이드가 영상인식으로 장애물 미션을 자율 수행하는 소프트웨어를 개발했습니다."
      )
    }
  ],

  experience: [
    {
      period: L("Dec 2025 to Jun 2026", "2025.12 ~ 2026.06"),
      title: L("AI Digital System Semiconductor R&D Design Program", "인공지능 디지털 시스템반도체 R&D 설계 인력 양성 과정"),
      org: L("Synopsys Academic & Research Alliances and Myongji University, 960 hours", "Synopsys Academic & Research Alliances, 명지대학교 · 960시간"),
      points: [
        L("ASIC flow from RTL to GDSII with Design Compiler, IC Compiler II, Formality, PrimeTime, VCS and Verdi", "Design Compiler, IC Compiler II, Formality, PrimeTime, VCS, Verdi를 사용한 ASIC RTL-to-GDSII flow"),
        L("Two projects: the 8-bit CISC processor and the ORCA SoC", "프로젝트 2건: 8-bit CISC 프로세서, ORCA SoC")
      ]
    },
    {
      period: L("Jan 2023 to Nov 2025", "2023.01 ~ 2025.11"),
      title: L("Air defense system software officer, First Lieutenant", "방공체계 SW 담당 장교 (중위)"),
      org: L("Republic of Korea Air Force", "대한민국 공군"),
      points: [
        L("Planned and coordinated 18 software updates covering 131 improvement items across development, operations and system teams", "개발, 작전, 체계운용 부서와 협조해 SW 업데이트 18회, 개선 항목 131건을 계획하고 총괄"),
        L("Led a new web-based status reporting system from requirements and screen design through operational testing and rollout", "웹 기반 상황 보고 체계 신규 개발을 요구사항 정리, 화면 설계부터 운용시험평가, 전력화까지 총괄"),
        L("Redesigned a system changeover procedure, cutting it from about one week to about two hours", "체계 전환 절차를 개선해 소요 시간을 약 1주일에서 약 2시간으로 단축")
      ]
    },
    {
      period: L("Jun 2021 to Dec 2021", "2021.06 ~ 2021.12"),
      title: L("Intern, chip design and measurement", "현장실습생, 칩 설계 및 측정"),
      org: L("Korea Institute of Science and Technology (KIST)", "한국과학기술연구원(KIST)"),
      points: [
        L("Digital block design and layout for a SPAD image sensor in TSMC 180 nm", "TSMC 180nm SPAD 이미지센서의 디지털 block 설계와 layout"),
        L("Test board, FPGA code and GUI for chip measurement", "칩 측정용 test board, FPGA 코드, GUI 구축")
      ]
    }
  ],

  education: {
    school: L("University of Seoul", "서울시립대학교"),
    degree: L("B.S. in Electrical and Computer Engineering", "전자전기컴퓨터공학 학사"),
    period: L("2017 to 2022", "2017 ~ 2022"),
    gpa: L("GPA 4.23 / 4.5 overall, 4.33 / 4.5 in the major", "평점 4.23 / 4.5, 전공 평점 4.33 / 4.5"),
    courses: L(
      "A+ in Integrated Circuit Design, Computer Architecture, Microprocessors, Semiconductor Devices, Electronic Circuits, Operating Systems and Compilers",
      "집적회로설계, 컴퓨터구조, 마이크로프로세서, 반도체소자, 전자회로1, 운영체제, 형식언어및컴파일러 A+"
    )
  },

  awards: [
    {
      year: "2026",
      title: L("Top Award, KDT final hackathon", "KDT 파이널 해커톤 최우수상"),
      org: L("Myongji University, for the ORCA SoC project", "명지대학교 · ORCA SoC 프로젝트")
    },
    {
      year: "2024",
      title: L("Excellence Award in electronic circuit design, Aviation Technology Competition", "항공기술 경연대회 전자회로설계 분야 우수상 (군수사령관상)"),
      org: L("ROKAF Logistics Command. Timed schematic and PCB layout in OrCAD and PADS.", "공군군수사령부 · OrCAD schematic, PADS PCB layout")
    },
    {
      year: "2020",
      title: L("Encouragement Award, Robot Industry Online Hackathon", "로봇산업 온라인 해커톤 장려상"),
      org: L("Korea University and the Korea Association of Robot Industry", "고려대학교, 로봇산업협회")
    },
    {
      year: "2020",
      title: L("National Science and Engineering Scholarship", "국가우수(이공계)장학"),
      org: L("Korea Student Aid Foundation. Full tuition for four semesters.", "한국장학재단 · 4학기 수업료 전액")
    },
    {
      year: "2017, 2019",
      title: L("Academic Excellence Scholarship", "학업우수장학"),
      org: L("University of Seoul. Top 10% of the class.", "서울시립대학교 · 성적 상위 10%")
    }
  ],

  skills: [
    { stage: L("RTL design and verification", "RTL 설계 · Verification"), items: "Verilog, SystemVerilog, UVM, VCS, Verdi, Vivado, Quartus Prime" },
    { stage: L("Synthesis and STA", "Synthesis · STA"), items: "Design Compiler, SDC, MCMM, PrimeTime, Formality" },
    { stage: L("Place and route", "P&R"), items: "IC Compiler II, UPF multi-voltage, CTS, ECO" },
    { stage: L("Sign-off", "Sign-off"), items: "PrimeTime DMSA, StarRC, LEC, DRC, LVS" },
    { stage: L("Automation", "자동화"), items: "Python, Tcl, Shell, SQLite, Git and GitHub pull requests" },
    { stage: L("Also", "기타"), items: "Cadence Virtuoso, OrCAD, PADS, C, C++, Java" }
  ],

  ui: {
    nav: {
      projects: L("Projects", "프로젝트"),
      experience: L("Experience", "경력"),
      education: L("Education", "학력 · 수상"),
      skills: L("Skills", "기술"),
      contact: L("Contact", "연락처")
    },
    mapTitle: L("Where each project sits in the design flow", "설계 flow에서 각 프로젝트의 위치"),
    mapNote: L("A filled cell means I did hands-on work at that stage.", "채워진 칸은 해당 단계를 직접 수행했다는 뜻입니다."),
    covered: L("covered", "수행"),
    notCovered: L("not covered", "해당 없음"),
    projects: L("Projects", "프로젝트"),
    otherWork: L("Other work", "그 외 프로젝트"),
    experience: L("Experience", "경력"),
    education: L("Education", "학력"),
    awards: L("Awards and scholarships", "수상 · 장학"),
    skills: L("Skills", "기술"),
    contact: L("Contact", "연락처"),
    readMore: L("Read the project page", "프로젝트 상세 보기"),
    back: L("All projects", "전체 프로젝트"),
    period: L("Period", "기간"),
    tools: L("Tools", "사용 도구"),
    stagesLabel: L("Stages", "수행 단계"),
    keyFacts: L("Key figures", "핵심 수치"),
    repos: L("Source", "소스"),
    privateTag: L("private", "비공개"),
    privateNote: L("Private repositories open only for people with access. I am reviewing which ones can be made public.", "비공개 repository는 권한이 있는 사람에게만 열립니다. 공개 전환 가능 여부를 검토하고 있습니다."),
    report: L("Report", "보고서"),
    repoWord: L("Repository", "Repository"),
    email: L("Email", "이메일"),
    copy: L("Copy", "복사"),
    copied: L("Copied", "복사됨"),
    github: L("GitHub", "GitHub"),
    langSwitch: L("한국어", "English"),
    langSwitchLabel: L("한국어로 보기", "View in English"),
    notFound: L("That page does not exist.", "없는 페이지입니다."),
    next: L("Next project", "다음 프로젝트")
  }
};
