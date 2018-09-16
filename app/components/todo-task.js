import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import {isEmpty} from '@ember/utils';

export default Component.extend({
	newTitle:null,
	store: service(),
	flashMessages: service(),

	incomplete: computed('tasks.{[],@each.status}',function(){
		return this.get('tasks').filterBy('status','incomplete');
	}),

	hasTitle: computed('newTitle',function(){
		return !isEmpty(this.get('newTitle'));
	}),

	init(){
		this._super(...arguments);
	},

	didInsertElement(){
		this._super(...arguments);
	},

	actions:{
		saveTask(){
			let newRecord = this.get('store').createRecord('task', {title: this.get('newTitle'), status:'incomplete'});
			let that = this;
			newRecord.save().then(function(){
				that.get('flashMessages').success('Successfully saved!');
				that.set('newTitle','');
			});
		},

		destroyTask(task){
			task.destroyRecord();
		},

		markAllDone(){
			let notDone = this.get('tasks').filterBy('status','incomplete');
			
			if(confirm('Are you sure?')){
				notDone.setEach('status','done');
				notDone.invoke('save');
			}

		},

		
	}
});
