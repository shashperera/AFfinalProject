
new Vue({

	el: '#app',
	
	data: {
		data: {},
		form_edit: false,
		form_delete: false,
		title: '',
		text: '',
		input: [],
    filters: []
	},

	created()
	{
		this.data = [
			{
				id: 1,
				descr: "Plumbing",
				start_date: "2019-03-09",
				notes: "Libero non voluptas est"
			},
			{
				id: 2,
				descr: "Electric",
				start_date: "2019-04-19",
				notes: "Vel exercitationem nam cumque"
			},
			{
				id: 3,
				descr: "Freight",
				start_date: "2019-05-17",
				notes: "Quisquam molestiae in dicta dolores"
			}
		];

		this.fields =  [
			{
				name: "id",
				label: "Id",
				align: "right",
				type: "number"
			},
			{
				name: "descr",
				label: "Description",
				align: "left",
				type: "text"
			},
			{
				name: "start_date",
				label: "Start date",
				align: "left",
				type: "date"
			},
			{
				name: "notes",
				label: "Notes",
				align: "left",
				type: "text"
			}	
		];
	},
	
	methods: {

		getField: function (name)
		{
			var value = null;
			this.fields.forEach(function (item)
			{
				if(item.name == name) {
					value = item;
				}
			});
			return value;
		},

		edit: function(record)
		{
			this.input = record;
			this.form_edit = true;
		},

		commit: function(record)
		{
			this.$q.notify(`Commit id # ${record.id}`);
		},

		filter: function()
		{
			this.$q.notify('Filter list');
		}
	}
});
