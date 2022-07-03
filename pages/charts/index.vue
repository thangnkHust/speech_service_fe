<template>
  <div>
    <v-row class="my-4">
      <v-col cols="3">
        <v-card color="primary" class="mx-auto" max-width="344">
          <v-card-text>
            <div>Word of the Day</div>
            <p class="text-h4 text--primary">
              Card 1
            </p>
            <p>adjective</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="warning" class="mx-auto" max-width="344">
          <v-card-text>
            <div>Word of the Day</div>
            <p class="text-h4 text--primary">
              Card 2
            </p>
            <p>adjective</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="success" class="mx-auto" max-width="344">
          <v-card-text>
            <div>Word of the Day</div>
            <p class="text-h4 text--primary">
              Card 3
            </p>
            <p>adjective</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="error" class="mx-auto" max-width="344">
          <v-card-text>
            <div>Word of the Day</div>
            <p class="text-h4 text--primary">
              Card 4
            </p>
            <p>adjective</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <apexchart
          width="500"
          type="line"
          :options="options"
          :series="series"
        ></apexchart>
      </v-col>
      <v-col cols="6">
        <apexchart
          width="450"
          type="donut"
          :options="options2"
          :series="series2"
        ></apexchart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ],
      options2: {},
      series2: [44, 55, 41, 17, 15]
    };
  }
};
</script>

<style></style>
