<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Personal Data Sheet Manager</span>
			<div class="flex-grow-1"></div>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon color="primary" v-on="on">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>
				<span>Create New PDS</span>
			</v-tooltip>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="dummyData">
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" :md="isInDefaultSearchOption ? '2' : '3'">
							<v-select solo label="Search By" :items="searchOptions" item-text="name" item-value="id"
									  v-model="selectedSearchOption"></v-select>
						</v-col>
						<v-col cols="12" :md="isInDefaultSearchOption ? '8' : '7'">
							<v-text-field solo label="Search" :disabled="isInDefaultSearchOption"></v-text-field>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn color="primary" large block>
								<span class="mr-1">Process</span>
								<v-icon>mdi-database-search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</template>
			<template v-slot:item.employeeNumber="{item}">
				<span class="font-weight-bold text-uppercase">{{item.employeeNumber}}</span>
			</template>
			<template v-slot:item.name="{item}">
				<span class="text-capitalize">{{item.name}}</span>
			</template>
			<template v-slot:item.position="{item}">
				<span class="text-capitalize">{{item.position}}</span>
			</template>
			<template v-slot:item.college="{item}">
				<span class="text-uppercase font-weight-bold">{{item.college}}</span>
			</template>
			<template v-slot:item.action="{item}">
				<v-btn icon color="secondary">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
    const tableHeaders = [
        {
            text: "Employee Number",
            align: "left",
            value: "employeeNumber"
        },
        {
            text: "Name",
            value: "name"
        },
        {
            text: "Position",
            value: "position"
        },
        {
            text: "College",
            value: "college"
        },
        {
            text: "Action",
            value: "action"
        },
    ];

    const searchOptions = [
        {
            id: 0,
            name: "All"
        },
        {
            id: 1,
            name: "Employee Number"
        },
        {
            id: 2,
            name: "Last Name"
        }
    ];

    export default {
        name: "personal-data-sheet-manager",

        data() {
            return {
                tableHeaders,
                searchOptions,
                dummyData: [
                    {
                        employeeNumber: "xxxx-xxx-xxxx",
                        name: "John D. Doe Jr.",
                        position: "Instructor 3",
                        college: "CET"
                    }
                ],
                selectedSearchOption: 0
            };
        },

		computed: {
            isInDefaultSearchOption() {
                return this.selectedSearchOption === 0;
			}
		}
    };
</script>