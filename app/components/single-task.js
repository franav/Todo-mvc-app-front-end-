import Component from '@ember/component';

export default Component.extend({

	didInsertElement(){
		this._super(...arguments);
		let that = this;
		this.$('span.input-group-addon').click(function(){
			if(that.get('task').status == 'incomplete'){
				this.$.find('.fa').removeClass('fa-circle-o').addClass('fa-check-circle-o');
			}else{
				this.$.find('.fa').removeClass('fa-check-circle-o').addClass('fa-circle-o');
			}
		})
	},

	actions:{

		destroy(){
			if(confirm('Are you sure?')){
				this.get('destroyTask')(this.get('task'));
			}
		},

		toggleStatus(){
			let newStatus = (this.get('task').status == 'incomplete') ? 'done' : 'incomplete';
			this.get('task').set('status',newStatus);
			this.get('task').save();

		}
	}
});
