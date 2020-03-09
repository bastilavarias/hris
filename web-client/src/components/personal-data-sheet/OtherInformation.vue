<template>
	<v-card>
		<v-card-title>Other Information</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12" md="4">
					<v-card-title style="padding-left: 0 !important; padding-bottom: 0 !important;">
						<span class="v-card__subtitle" style="padding-left: 0 !important;">Hobbies ({{totalItems('hobbies')}})</span>
						<div class="flex-grow-1"></div>
						<v-scroll-x-transition>
							<v-btn small color="primary" icon @click="showAddHobbyField = !showAddHobbyField">
								<v-icon>{{showAddHobbyField ? "mdi-minus" : "mdi-plus"}}</v-icon>
							</v-btn>
						</v-scroll-x-transition>
					</v-card-title>
					<v-list>
						<v-slide-y-transition class="py-0"
						>
							<v-text-field v-model="newHobby" solo label="Enter Hobby" append-outer-icon="mdi-plus"
										  @click:append-outer="addItem('newHobby', 'hobbies')"
										  @keyup.enter="addItem('newHobby', 'hobbies')" single-line autofocus
										  v-if="showAddHobbyField">
							</v-text-field>
						</v-slide-y-transition>
						<v-slide-y-transition
								class="py-0"
								group
						>
							<template v-for="(hobby, index) in hobbies">
								<v-list-item :key="index">
									<v-list-item-content>
										<v-list-item-title class="text-capitalize">
											{{hobby}}
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon style="cursor: pointer;"
													  @click="deleteItem(index, 'hobbies')">
										<v-icon color="error">mdi-trash-can</v-icon>
									</v-list-item-icon>
								</v-list-item>
							</template>
						</v-slide-y-transition>
					</v-list>
				</v-col>
				<v-col cols="12" md="4">
					<v-card-title style="padding-left: 0 !important; padding-bottom: 0 !important;">
						<span class="v-card__subtitle" style="padding-left: 0 !important;">Recognitions ({{totalItems('recognitions')}})</span>
						<div class="flex-grow-1"></div>
						<v-scroll-x-transition>
							<v-btn small color="primary" icon @click="showAddRecognitionField = !showAddRecognitionField">
								<v-icon>{{showAddRecognitionField ? "mdi-minus" : "mdi-plus"}}</v-icon>
							</v-btn>
						</v-scroll-x-transition>
					</v-card-title>
					<v-list>
						<v-slide-y-transition class="py-0"
						>
							<v-text-field v-model="newRecognition" solo label="Enter Recognition" append-outer-icon="mdi-plus"
										  @click:append-outer="addItem('newRecognition', 'recognitions')"
										  @keyup.enter="addItem('newRecognition', 'recognitions')" single-line autofocus
										  v-if="showAddRecognitionField">
							</v-text-field>
						</v-slide-y-transition>
						<v-slide-y-transition
								class="py-0"
								group
						>
							<template v-for="(recognition, index) in recognitions">
								<v-list-item :key="index">
									<v-list-item-content>
										<v-list-item-title class="text-capitalize">
											{{recognition}}
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon style="cursor: pointer;"
													  @click="deleteItem(index, 'recognitions')">
										<v-icon color="error">mdi-trash-can</v-icon>
									</v-list-item-icon>
								</v-list-item>
							</template>
						</v-slide-y-transition>
					</v-list>
				</v-col>
				<v-col cols="12" md="4">
					<v-card-title style="padding-left: 0 !important; padding-bottom: 0 !important;">
						<span class="v-card__subtitle" style="padding-left: 0 !important;">Organizations ({{totalItems('organizations')}})</span>
						<div class="flex-grow-1"></div>
						<v-scroll-x-transition>
							<v-btn small color="primary" icon @click="showAddOrganizationField = !showAddOrganizationField">
								<v-icon>{{showAddOrganizationField ? "mdi-minus" : "mdi-plus"}}</v-icon>
							</v-btn>
						</v-scroll-x-transition>
					</v-card-title>
					<v-list>
						<v-slide-y-transition class="py-0"
						>
							<v-text-field v-model="newOrganization" solo label="Enter Recognition" append-outer-icon="mdi-plus"
										  @click:append-outer="addItem('newOrganization', 'organizations')"
										  @keyup.enter="addItem('newOrganization', 'organizations')" single-line autofocus
										  v-if="showAddOrganizationField">
							</v-text-field>
						</v-slide-y-transition>
						<v-slide-y-transition
								class="py-0"
								group
						>
							<template v-for="(organization, index) in organizations">
								<v-list-item :key="index">
									<v-list-item-content>
										<v-list-item-title class="text-capitalize">
											{{organization}}
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon style="cursor: pointer;"
													  @click="deleteItem(index, 'organizations')">
										<v-icon color="error">mdi-trash-can</v-icon>
									</v-list-item-icon>
								</v-list-item>
							</template>
						</v-slide-y-transition>
					</v-list>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
    const tableHeaders = [
        {
            text: "Special Skills/Hobbies"
        },
        {
            text: "Recognition"
        },
        {
            text: "Organization"
        }
    ];

    export default {
        name: "personal-data-sheet-other-information",

        data() {
            return {
                newHobby: "",
				newOrganization: "",
				newRecognition: "",
				hobbies: [
				    "Hobby 1"
				],
                recognitions: [
                    "Recognition 1"
				],
				organizations: [
				    "Organization 1"
				],
                showAddHobbyField: false,
                showAddRecognitionField: false,
                showAddOrganizationField: false
            };
        },

        methods: {
            addItem(dataName, arrayName) {
                if(this[dataName]) {
                    this[arrayName] = [
                        ...this[arrayName],
                        this[dataName]
                    ];
                }
                this[dataName] = "";
            },

            deleteItem(position, arrayName) {
                this[arrayName] = this[arrayName].filter((_, index) => position !== index);
            },

			totalItems(arrayName) {
                return this[arrayName].length;
			}
        }
    };
</script>