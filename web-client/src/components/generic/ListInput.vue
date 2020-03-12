<template>
	<div>
		<v-card-title style="padding-left: 0 !important; padding-bottom: 0 !important;">
			<span class="v-card__subtitle" style="padding-left: 0 !important;">{{label}} ({{totalItems('hobbies')}})</span>
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
	</div>
</template>

<script>
	export default {
	    name: "generic-list-input",

		props: {
	      label: {
	          type: String,
			  required: false
		  }
		},

        data() {
            return {
                newHobby: "",
                hobbies: [
                    "Hobby 1"
                ],
                showAddHobbyField: false,
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
    }
</script>