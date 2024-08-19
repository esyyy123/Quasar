<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col">
        <q-toolbar class="q-pa-none">
          <!-- Bagian Kiri dengan Tabs -->
          <q-btn-group unelevated>
            <q-btn
              flat
              label="Production Schedule"
              :style="{
                'text-transform': 'none',
                'font-size': '16px',
                'border-bottom': !pageProductionSchedule
                  ? '1px solid #e0e0e0'
                  : 'none',
                color: !pageProductionSchedule ? '#585858' : '',
              }"
              :class="{ activePage: pageProductionSchedule }"
              @click="handleBtnProductionSchedule"
            />
            <q-btn
              flat
              label="Report"
              :style="{
                'text-transform': 'none',
                'font-size': '16px',
                'border-bottom': !pageReport ? '1px solid #e0e0e0' : 'none',
                color: !pageReport ? '#585858' : '',
              }"
              :class="{ activePage: pageReport }"
              @click="handleBtnReport"
            />
            <q-btn
              flat
              icon="expand_more"
              :style="{ 'text-transform': 'none', 'font-size': '10px' }"
            />
          </q-btn-group>

          <q-space />

          <div
            class="q-ml-sm"
            :style="{
              'text-transform': 'none',
              'font-size': '16px',
              color: '#585858',
            }"
          >
            Last Update, 18 July 2024, 14:00
          </div>
        </q-toolbar>
      </div>
    </div>

    <!-- <div class="row flex flex-center q-mb-lg">
      <div class="col">
        <div class="flex">
          <q-btn
            flat
            :class="{ activePage: pageProductionSchedule }"
            label="Production Schedule"
            :style="{
              'text-transform': 'none',
              'border-bottom': !pageProductionSchedule
                ? '2px solid #e0e0e0'
                : 'none',
              'font-size': '16px',
            }"
            @click="handleBtnProductionSchedule"
          />
          <q-btn
            flat
            :class="{ activePage: pageReport }"
            label="Report"
            :style="{
              'text-transform': 'none',
              'border-bottom': !pageReport ? '2px solid #e0e0e0' : 'none',
              'margin-left': '0.5px',
              'font-size': '16px',
            }"
            @click="handleBtnReport"
            size="lg"
          />
          <q-btn-dropdown
            flat
            color="gray-14"
            dropdown-icon="expand_more"
            :style="{ 'font-size': '10px' }"
            dense
          ></q-btn-dropdown>
        </div>
      </div>
      <div class="col text-right">
        <span>Last Update, 18 July 2024, 14:00</span>
      </div>
    </div> -->

    <ProductionSchedulePage
      v-if="pageProductionSchedule"
      @on-toggle-click="toggleReportDrawer"
    />
    <ReportPage v-if="pageReport" @on-toggle-click="toggleReportDrawer" />
    <!-- <div class="row flex flex-center q-mb-lg">
      <div class="col">
        <span class="text-h5 text-bold">Production Schedule</span>
      </div>
      <div class="col text-right">
        <span>Last Update, 18 July 2024, 14:00</span>
      </div>
    </div>
    <div class="row flex-center q-mb-md">
      <div class="col">
        <q-btn
          :class="{ activeButton: isGanttActive }"
          flat
          icon="account_tree"
          :color="isGanttActive ? 'red-14' : 'grey-7'"
          label="Gantt"
          @click="activateGantt"
        />
        <q-btn
          :class="{ activeButton: isListActive }"
          flat
          icon="list"
          :color="isListActive ? 'red-14' : 'grey-7'"
          label="List"
          @click="activateList"
        />
        <q-btn
          :class="{ activeButton: isCalendarActive }"
          flat
          icon="calendar_today"
          :color="isCalendarActive ? 'red-14' : 'grey-7'"
          label="Calendar"
          @click="activateCalendar"
        />
      </div>
      <div class="col text-right">
        <q-btn
          icon="event_note"
          class="q-mr-sm buttonScheduler"
          outline
          color="grey-7"
          label="Report"
          @click="toggleReportDrawer"
        />
        <q-btn
          icon="fullscreen"
          class="q-mr-sm buttonScheduler"
          outline
          color="grey-7"
          label="Outline Rounded"
        />
        <span>10 - 25 July 2024</span>
      </div>
    </div>

    <div v-if="isGanttActive" class="row flex-center q-mb-md">
      <div class="col-5">
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          color="red-14"
          label="Add Schedule"
        />
        <q-btn
          icon="tune"
          class="q-mr-sm buttonScheduler"
          outline
          color="grey-7"
          label="Filter"
        />
        <q-btn
          icon="calendar_today"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Date"
        />
        <q-btn
          icon="remove"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
        />
        <span class="q-mr-sm">100 %</span>
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
        />
      </div>
      <div class="col-7 text-right">
        <q-chip class="chipCircle" color="grey-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Preparation</span
        >
        <q-chip class="chipCircle" color="blue-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Planning</span
        >
        <q-chip class="chipCircle" color="pink-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Bom</span
        >
        <q-chip class="chipCircle" color="cyan-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Kitting</span
        >
        <q-chip class="chipCircle" color="pink-5" /><span
          class="text-subtitle2 q-mr-sm"
          >Issue</span
        >
        <q-chip class="chipCircle" color="purple-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Model Change</span
        >
        <q-chip class="chipCircle" color="orange-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Production</span
        >
        <q-chip class="chipCircle" color="green-4" /><span
          class="text-subtitle2 q-mr-sm"
          >Complete</span
        >
      </div>
    </div>
    <div v-if="isListActive" class="row flex-center q-mb-md">
      <div class="col">
        <q-btn
          icon="tune"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Filter"
        />
        <q-btn
          icon="calendar_today"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
          label="Date"
        />
        <q-btn
          icon="remove"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
        />
        <span class="q-mr-sm">100 %</span>
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          outline
          rounded
          color="grey-7"
        />
      </div>
      <div class="col text-right">
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          unelevated
          color="red-14"
          label="Add Schedule"
        />
      </div>
    </div>
    <div v-if="isCalendarActive" class="row flex-center q-mb-md">
      <div class="col">
        <q-input
          rounded
          standout
          size="10px"
          bottom-slots
          v-model="text"
          label="Label"
          dense
        >
          <template v-slot:after>
            <q-btn
              icon="tune"
              class="q-mr-sm buttonScheduler"
              outline
              rounded
              color="grey-7"
              label="Filter"
            />
            <q-btn
              icon="calendar_today"
              class="q-mr-sm buttonScheduler"
              outline
              rounded
              color="grey-7"
              label="Date"
            />
            <q-btn
              icon="remove"
              class="buttonScheduler"
              outline
              rounded
              color="grey-7"
            />
            <span class="text-h6">100 %</span>
            <q-btn
              icon="add"
              class="q-mr-sm buttonScheduler"
              outline
              rounded
              color="grey-7"
            />
          </template>
        </q-input>
      </div>
      <div class="col text-right">
        <q-btn
          icon="add"
          class="q-mr-sm buttonScheduler"
          unelevated
          color="red-14"
          label="Add Schedula"
        />
      </div>
    </div>

    <div class="q-pa-sm overflow-x scroll">
      <q-markup-table separator="separator" bordered>
        <thead>
          <tr>
            <th style="width: 150px" class="text-center"></th>
            <th class="text-center" colspan="4">Wed, 17 Jul 2024</th>
            <th class="text-center" colspan="4">Thu, 18 Jul 2024</th>
            <th class="text-center" colspan="4">Fri, 19 Jul 2024</th>
            <th class="text-center" colspan="4">Sat, 20 Jul 2024</th>
            <th class="text-center" colspan="4">Sun, 21 Jul 2024</th>
            <th
              style="width: 200px; max-width: 200px"
              class="text-center"
              colspan="4"
            >
              Mon, 22 Jul 2024
            </th>
            <th
              style="width: 200px; max-width: 200px"
              class="text-center"
              colspan="4"
            >
              Tue, 23 Jul 2024
            </th>
            <th
              style="width: 200px; max-width: 200px"
              class="text-center"
              colspan="4"
            >
              Tue, 24 Jul 2024
            </th>
            <th
              style="width: 200px; max-width: 200px"
              class="text-center"
              colspan="4"
            >
              Tue, 24 Jul 2024
            </th>
            <th
              style="width: 200px; max-width: 200px"
              class="text-center"
              colspan="4"
            >
              Tue, 24 Jul 2024
            </th>
            <th
              style="width: 200px; max-width: 200px"
              class="text-center"
              colspan="4"
            >
              Tue, 24 Jul 2024
            </th>
          </tr>
          <tr>
            <th class="text-center"></th>
            <th style="width: 50px; max-width: 50px" class="text-center">6</th>
            <th style="width: 50px; max-width: 50px" class="text-center">12</th>
            <th style="width: 50px; max-width: 50px" class="text-center">18</th>
            <th style="width: 50px; max-width: 50px" class="text-center">24</th>
            <th class="text-center">6</th>
            <th class="text-center">12</th>
            <th class="text-center">18</th>
            <th class="text-center">24</th>
            <th class="text-center">6</th>
            <th class="text-center">12</th>
            <th class="text-center">18</th>
            <th class="text-center">24</th>
            <th class="text-center">6</th>
            <th class="text-center">12</th>
            <th class="text-center">18</th>
            <th class="text-center">24</th>
            <th class="text-center">6</th>
            <th class="text-center">12</th>
            <th class="text-center">18</th>
            <th class="text-center">24</th>
            <th class="text-center">6</th>
            <th class="text-center">12</th>
            <th class="text-center">18</th>
            <th class="text-center">24</th>
            <th class="text-center">6</th>
            <th class="text-center">12</th>
            <th class="text-center">18</th>
            <th class="text-center">24</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">
              <div class="q-ma-sm">
                <div>
                  <span>AS-01 (MB)</span>
                </div>
                <q-avatar text-color="black" icon="lock_open" />
              </div>
            </td>
            <td colspan="4" class="text-center">
              <div>
                <q-badge color="blue">
                  <div class="row">
                    <span>XM20240705-01</span>
                    <span>Factory 4 #2</span>
                    <div class="flex-break"></div>
                    <span>Completed</span>
                  </div>
                </q-badge>
              </div>
            </td>
            <td colspan="4" class="text-center">DWADAWDAWDA</td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <td class="text-center">
              <div class="q-ma-sm">
                <div>
                  <span>AS-02 (MB)</span>
                </div>
                <q-avatar text-color="black" icon="lock_open" />
              </div>
            </td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <td class="text-center">
              <div class="q-ma-sm">
                <div>
                  <span>AS-03 (MB)</span>
                </div>
                <q-avatar text-color="black" icon="lock_open" />
              </div>
            </td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
          </tr>
        </tbody>
      </q-markup-table>
    </div> -->

    <!-- aaa -->
    <!-- <div :class="$style.home">
      <div :class="$style.ganttChartInfo">
        <div :class="$style.ganttChart">
          <div :class="$style.schedule">
            <div :class="$style.planning1">
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Wed, 17 Jul 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Thu, 18 Jul 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Fri, 19 Jul 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning3">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal3">
                    <div :class="$style.mon01July">Sat, 20 Jul 2024</div>
                  </div>
                  <div :class="$style.jam3">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning3">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal3">
                    <div :class="$style.mon01July">Sun, 21 Jul 2024</div>
                  </div>
                  <div :class="$style.jam3">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Mon, 22 Jul 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Tue, 23 Jul 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Mon, 01 July 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
              <div :class="$style.dailyPlanning">
                <div :class="$style.jamTanggalPlanning">
                  <div :class="$style.tanggal">
                    <div :class="$style.mon01July">Mon, 01 July 2024</div>
                  </div>
                  <div :class="$style.jam">
                    <div :class="$style.div2">
                      <div :class="$style.div">6</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">12</div>
                    </div>
                    <div :class="$style.div2">
                      <div :class="$style.div">18</div>
                    </div>
                    <div :class="$style.div4">
                      <div :class="$style.div">24</div>
                    </div>
                  </div>
                </div>
                <div :class="$style.planning2">
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                  <div :class="$style.div10" />
                  <div :class="$style.div11" />
                </div>
              </div>
            </div>
            <div :class="$style.planning11">
              <div :class="$style.listSchedulePlanning">
                <div :class="$style.schedule1">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Completed</div>
                  </div>
                </div>
                <div :class="$style.schedule2" @click="openListRightClick">
                  <div :class="$style.scheduleItem" />
                  <div :class="$style.frameGroup">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #3</div>
                  </div>
                  <div :class="$style.scheduleInner" />
                  <div :class="$style.productionParent">
                    <div :class="$style.div">Production</div>
                    <div :class="$style.div">
                      <span>Qty 2.314/5.000 </span>
                      <span :class="$style.span">(50%)</span>
                    </div>
                  </div>
                </div>
                <div :class="$style.schedule3" @click="openListRightClick1">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Issue</div>
                  </div>
                </div>
                <div :class="$style.schedule4">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 2 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">BOM</div>
                  </div>
                </div>
                <div :class="$style.schedule5">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Modul Change</div>
                  </div>
                </div>
                <div :class="$style.schedule6" @click="openListRightClick2">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule7">
                  <div :class="$style.scheduleItem" />
                  <div :class="$style.frameGroup">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #3</div>
                  </div>
                  <div :class="$style.scheduleInner" />
                  <div :class="$style.productionParent">
                    <div :class="$style.div">Production</div>
                    <div :class="$style.div">
                      <span>Qty 2.314/5.000 </span>
                      <span :class="$style.span">(50%)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.frameParent5">
                <div :class="$style.xm2024070501Parent">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule8">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
                <div :class="$style.schedule9">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
              </div>
              <div :class="$style.scheduleParent">
                <div :class="$style.schedule10">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule8">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.planning15">
              <div :class="$style.listSchedulePlanning">
                <div :class="$style.schedule12">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Cancel</div>
                  </div>
                </div>
                <div :class="$style.schedule13" @click="openListRightClick3">
                  <div :class="$style.scheduleItem" />
                  <div :class="$style.frameGroup">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #3</div>
                  </div>
                  <div :class="$style.scheduleInner" />
                  <div :class="$style.productionParent">
                    <div :class="$style.div">Production</div>
                    <div :class="$style.div">
                      <span>Qty 3.850/5.000 </span>
                      <span :class="$style.span">(77%)</span>
                    </div>
                  </div>
                </div>
                <div :class="$style.xm2024070501Parent">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule14" @click="openScheduleDetails">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 2 #3</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Kitting</div>
                  </div>
                </div>
                <div :class="$style.schedule6" @click="openScheduleDetails">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
              </div>
              <div :class="$style.frameParent14">
                <div :class="$style.xm2024070501Parent1">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule16">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule17">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
                <div :class="$style.xm2024070501Parent1">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
              </div>
              <div :class="$style.scheduleParent">
                <div :class="$style.schedule6" @click="openScheduleDetails">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule8">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
              <div :class="$style.processList">
                <div :class="$style.komponenTabel">
                  <div :class="$style.cellData">SMT-A</div>
                </div>
                <div :class="$style.komponenTabel1">
                  <div :class="$style.cellData">ASSEMBLY</div>
                </div>
                <div :class="$style.komponenTabel2">
                  <div :class="$style.cellData2">2</div>
                </div>
                <div :class="$style.komponenTabel3">
                  <div :class="$style.cellData">1</div>
                </div>
              </div>
            </div>
            <div :class="$style.planning19">
              <div :class="$style.listSchedulePlanning">
                <div :class="$style.schedule20" @click="openListRightClick4">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Modul Change</div>
                  </div>
                </div>
                <div :class="$style.schedule21">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 2 #3</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Kitting</div>
                  </div>
                </div>
                <div :class="$style.xm2024070501Parent">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule4">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 2 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">BOM</div>
                  </div>
                </div>
                <div :class="$style.schedule23">
                  <div :class="$style.scheduleItem" />
                  <div :class="$style.frameGroup">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #3</div>
                  </div>
                  <div :class="$style.scheduleInner" />
                  <div :class="$style.productionParent">
                    <div :class="$style.div">Production</div>
                    <div :class="$style.div">Qty Output 3.000/5.000 (60%)</div>
                  </div>
                </div>
                <div :class="$style.schedule24">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Issue</div>
                  </div>
                </div>
              </div>
              <div :class="$style.frameParent5">
                <div :class="$style.xm2024070501Parent">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule8">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
                <div :class="$style.schedule26">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.xm2024070501Parent5">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule26">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
              </div>
              <div :class="$style.scheduleWrapper">
                <div :class="$style.schedule28">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.planning22">
              <div :class="$style.listSchedulePlanning">
                <div :class="$style.schedule29">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Completed</div>
                  </div>
                </div>
                <div :class="$style.schedule30">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 2 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">BOM</div>
                  </div>
                </div>
                <div :class="$style.schedule31">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Modul Change</div>
                  </div>
                </div>
                <div :class="$style.schedule32">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 2 #3</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Kitting</div>
                  </div>
                </div>
                <div :class="$style.schedule33">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Cancel</div>
                  </div>
                </div>
              </div>
              <div :class="$style.frameParent34">
                <div :class="$style.xm2024070501Parent6">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule34">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
              <div :class="$style.scheduleWrapper">
                <div :class="$style.schedule35">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.planning24">
              <div :class="$style.scheduleParent3">
                <div :class="$style.schedule36">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Issue</div>
                  </div>
                </div>
                <div :class="$style.schedule37">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Completed</div>
                  </div>
                </div>
                <div :class="$style.schedule38">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 3 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Modul Change</div>
                  </div>
                </div>
                <div :class="$style.schedule39">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
              </div>
              <div :class="$style.frameParent41">
                <div :class="$style.xm2024070501Parent7">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule40">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule41">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
                <div :class="$style.schedule41">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
              <div :class="$style.scheduleParent4">
                <div :class="$style.schedule43">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule44">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
                <div :class="$style.schedule43">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule44">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.planning29">
              <div :class="$style.listSchedulePlanning">
                <div :class="$style.schedule29">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Completed</div>
                  </div>
                </div>
                <div :class="$style.schedule29">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 4 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Completed</div>
                  </div>
                </div>
              </div>
              <div :class="$style.frameParent51">
                <div :class="$style.xm2024070501Parent7">
                  <div :class="$style.div">XM20240705-01</div>
                  <div :class="$style.production3">Production</div>
                </div>
                <div :class="$style.schedule40">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #2</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.issueWrapper">
                    <div :class="$style.div">Planning</div>
                  </div>
                </div>
                <div :class="$style.schedule41">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
              <div :class="$style.scheduleWrapper">
                <div :class="$style.schedule44">
                  <div :class="$style.frameParent">
                    <div :class="$style.xm2024070501Wrapper">
                      <div :class="$style.xm2024070501">XM20240705-01</div>
                    </div>
                    <div :class="$style.factory42">Factory 1 #1</div>
                  </div>
                  <div :class="$style.scheduleChild" />
                  <div :class="$style.completedWrapper">
                    <div :class="$style.div">Preparation</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.scheduleChild52" />
          </div>
          <div :class="$style.line">
            <div :class="$style.spacer">
              <img
                :class="$style.infoCircleIcon"
                alt=""
                src="info-circle.svg"
              />
              <div :class="$style.info">
                <div :class="$style.draft">1 : Planning</div>
                <div :class="$style.draft">2 & 3 : Draft</div>
              </div>
            </div>
            <div :class="$style.sectionLineAngka">
              <div :class="$style.sectionLine">
                <div :class="$style.line1">
                  <div :class="$style.gantt">AS-01 (MB)</div>
                  <img :class="$style.kunciIcon" alt="" src="Kunci.svg" />
                  <div :class="$style.foto" />
                </div>
                <div :class="$style.line1">
                  <div :class="$style.gantt">AS-02 (MB)</div>
                  <img :class="$style.kunciIcon" alt="" src="Kunci.svg" />
                  <div :class="$style.foto" />
                </div>
                <div :class="$style.line1">
                  <div :class="$style.gantt">AS-03 (MB)</div>
                  <img :class="$style.kunciIcon" alt="" src="Kunci.svg" />
                  <div :class="$style.foto" />
                </div>
                <div :class="$style.line4">
                  <div :class="$style.gantt">AS-04 (MB)</div>
                  <img :class="$style.kunciIcon" alt="" src="Kunci.svg" />
                  <img :class="$style.fotoIcon" alt="" src="Foto.png" />
                </div>
                <div :class="$style.line4">
                  <div :class="$style.gantt">AS-05 (MB)</div>
                  <img :class="$style.kunciIcon" alt="" src="Kunci.svg" />
                  <img :class="$style.fotoIcon" alt="" src="Foto.png" />
                </div>
                <div :class="$style.line4">
                  <div :class="$style.gantt">AS-06 (MB)</div>
                  <img :class="$style.kunciIcon" alt="" src="Kunci.svg" />
                  <img :class="$style.fotoIcon3" alt="" src="Foto.png" />
                </div>
              </div>
              <div :class="$style.sectionLine1">
                <div :class="$style.line7">
                  <div :class="$style.spacer1">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="list-business-shop_svgrepo.com.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Act.</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                  <div :class="$style.spacer2">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="fluent-mdl2:time-entry.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Draft</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                </div>
                <div :class="$style.line7">
                  <div :class="$style.spacer1">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="list-business-shop_svgrepo.com.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Act.</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                  <div :class="$style.spacer2">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="fluent-mdl2:time-entry.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Draft</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                </div>
                <div :class="$style.line7">
                  <div :class="$style.spacer1">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="list-business-shop_svgrepo.com.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Act.</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                  <div :class="$style.spacer2">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="fluent-mdl2:time-entry.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Draft</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                </div>
                <div :class="$style.line7">
                  <div :class="$style.spacer1">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="list-business-shop_svgrepo.com.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Act.</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                  <div :class="$style.spacer2">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="fluent-mdl2:time-entry.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Draft</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                </div>
                <div :class="$style.line7">
                  <div :class="$style.spacer1">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="list-business-shop_svgrepo.com.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Act.</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                  <div :class="$style.spacer2">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="fluent-mdl2:time-entry.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Draft</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                </div>
                <div :class="$style.line7">
                  <div :class="$style.spacer1">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="list-business-shop_svgrepo.com.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Act.</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                  <div :class="$style.spacer2">
                    <img
                      :class="$style.ganttIcon"
                      alt=""
                      src="fluent-mdl2:time-entry.svg"
                    />
                    <div :class="$style.gantt">
                      <p :class="$style.act">Draft</p>
                      <p :class="$style.act">Plan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.info1">
          <div :class="$style.filter">
            <div :class="$style.div">Work Order</div>
            <div :class="$style.sa">XM20240702-05</div>
          </div>
          <div :class="$style.filter">
            <div :class="$style.div">Model Number</div>
            <div :class="$style.sa">SMC523C3UN20000M1</div>
          </div>
          <div :class="$style.filter">
            <div :class="$style.div">QTY</div>
            <div :class="$style.sa">15498</div>
          </div>
          <div :class="$style.filter">
            <div :class="$style.div">Process</div>
            <div :class="$style.sa">SA</div>
          </div>
          <div :class="$style.filter">
            <div :class="$style.div">Start</div>
            <div :class="$style.sa">2024-07-10 14:07</div>
          </div>
          <div :class="$style.filter">
            <div :class="$style.div">Est. end</div>
            <div :class="$style.sa">2024-07-11 22:06</div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- aaa -->
  </q-page>

  <!-- drawer -->
  <q-drawer
    v-model="reportDrawerOpen"
    side="left"
    elevated
    overlay
    class="q-pa-md"
  >
    <q-scroll-area class="fit">
      <!-- drawer content -->
      <div class="row flex q-mb-sm">
        <div class="col col-md-10">
          <span class="text-h5">Report List</span>
        </div>
        <div class="col col-md-2 self-center" style="text-align: end">
          <q-icon
            name="close"
            size="xs"
            color="grey"
            @click="toggleReportDrawer"
          ></q-icon>
        </div>
      </div>
      <q-separator />
      <div class="q-py-sm">
        <search-bar :placeholder="WorkOrder / Model / Process"></search-bar>
      </div>
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="menuItem.label === 'Outbox'"
            v-ripple
            @click="moveTo(menuItem.route)"
          >
            <q-item-section avatar class="col col-md-2">
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section class="col col-md-8">
              {{ menuItem.label }}
            </q-item-section>
            <q-item-section class="col col-md-2" style="align-items: end">
              <q-icon name="chevron_right"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped>
.activeButton {
  border-bottom: 2px solid;
}
.buttonScheduler {
  border-radius: 10px;
}
.chipCircle {
  border-radius: 20%;
  width: 30px;
  height: 20px;
}
</style>

<script>
import SearchBar from "src/components/SearchBar.vue";
import ProductionSchedulePage from "../components/ProductionSchedulePage.vue";
import ReportPage from "../components/ReportPage.vue";
import { ref } from "vue";

// import FullCalendar from "@fullcalendar/vue3";
// import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export default {
  components: {
    SearchBar,
    ProductionSchedulePage,
    ReportPage,
  },
  setup() {
    const menuList = [
      {
        icon: "assignment",
        label: "Report Daily Production",
        sublabel: "Report Daily Production",
        route: "reports/daily-production-confirmation",
        separator: false,
      },
      {
        icon: "description",
        label: "Schedule Summary",
        sublabel: "Schedule Summary",
        route: "reports/schedule-summary",
        separator: true,
      },
      {
        icon: "inbox",
        label: "Inbox",
        separator: true,
      },
      {
        icon: "send",
        label: "Outbox",
        separator: false,
      },
      {
        icon: "delete",
        label: "Trash",
        separator: false,
      },
      {
        icon: "error",
        label: "Spam",
        separator: true,
      },
      {
        icon: "settings",
        label: "Settings",
        separator: false,
      },
      {
        icon: "feedback",
        label: "Send Feedback",
        separator: false,
      },
      {
        icon: "help",
        iconColor: "primary",
        label: "Help",
        separator: false,
      },
    ];

    const reportDrawerOpen = ref(false);

    return {
      menuList,
      reportDrawerOpen,
      toggleReportDrawer() {
        reportDrawerOpen.value = !reportDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      isGanttActive: true,
      isListActive: false,
      isCalendarActive: false,
      pageProductionSchedule: true,
      pageReport: false,
    };
  },
  methods: {
    trigg() {
      console.log("click");
    },
    activateGantt() {
      this.isGanttActive = true;
      this.isListActive = false;
      this.isCalendarActive = false;
    },
    activateList() {
      this.isGanttActive = false;
      this.isListActive = true;
      this.isCalendarActive = false;
    },
    activateCalendar() {
      this.isGanttActive = false;
      this.isListActive = false;
      this.isCalendarActive = true;
    },
    moveTo(route) {
      console.log(route);
      this.$router.push(`/app/scheduler/${route}`);
    },
    handleBtnProductionSchedule() {
      this.pageProductionSchedule = true;
      this.pageReport = false;
    },
    handleBtnReport() {
      this.pageReport = true;
      this.pageProductionSchedule = false;
    },
  },
};
</script>

<style scoped>
.activePage {
  color: #cd202e;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border: 1px solid #e0e0e0;
  border-bottom: none;
}
</style>
