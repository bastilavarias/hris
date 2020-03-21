<template>
	<div>
		<v-card-title style="padding-left: 0 !important; padding-bottom: 0 !important;">
			<span class="v-card__subtitle"
				  style="padding-left: 0 !important;">{{label}} ({{totalItems("listLocal")}})</span>
			<div class="flex-grow-1"></div>
			<v-scroll-x-transition>
				<v-btn small color="primary" icon @click="showField = !showField">
					<v-icon>{{showField ? "mdi-minus" : "mdi-plus"}}</v-icon>
				</v-btn>
			</v-scroll-x-transition>
		</v-card-title>
		<v-list>
			<v-slide-y-transition class="py-0"
			>
				<v-text-field v-model="newItem" solo label="Enter New Item" append-outer-icon="mdi-plus"
							  @click:append-outer="add('newItem', 'listLocal')"
							  @keyup.enter="add('newItem', 'listLocal')" single-line autofocus
							  v-if="showField">
				</v-text-field>
			</v-slide-y-transition>
			<v-slide-y-transition
					class="py-0"
					group
			>
				<template v-for="(listItem, index) in listLocal">
					<v-list-item :key="index">
						<v-list-item-content>
							<v-list-item-title class="text-capitalize">
								{{listItem}}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon style="cursor: pointer;"
										  @click="remove(index, 'listLocal')">
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
            },

            list: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                newItem: "",
                showField: false,
				listLocal: [],
            };
        },

        watch: {
            list(val) {
                this.$emit("update:list", val);
            },
            listLocal(val) {
                this.$emit("update:list", val);
            }
        },

        methods: {
            add(dataName, arrayName) {
                if (this[dataName]) {
                    this[arrayName] = [
                        ...this[arrayName],
                        this[dataName]
                    ];
                }
                this[dataName] = "";
            },

            remove(position, arrayName) {
                this[arrayName] = this[arrayName].filter((_, index) => position !== index);
            },

            totalItems(arrayName) {
                return this[arrayName].length;
            }
        },

		created() {
            this.listLocal = this.list;
        }
    };
</script>