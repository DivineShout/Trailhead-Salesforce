import { LightningElement } from 'lwc';
import getAnimalRangeById from '@salesforce/apex/Animal.getAnimalRangeById';
import createAnimals from '@salesforce/apex/Animal.createAnimals';

const columns = [
    { label: 'ID', fieldName: 'id__c' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Says', fieldName: 'says__c' },
    { label: 'Eats', fieldName: 'eats__c' }
];

export default class Animal extends LightningElement {

    minId = null;
    maxId = null;
    columns = columns;
    animalList = [];

    changeHandlerMin(event) {
    this.minId = event.target.value;
  }
    changeHandlerMax(event) {
    this.maxId = event.target.value;
  }

    getAnimalBtnClickHandler() {
        getAnimalRangeById({ minId : this.minId,
            maxId : this.maxId
        }).then(result => {
            if(result) {
                console.log(result);
                this.animalList = result;
            }
            else if(error) {
                let errorMessage = "Error: " + error;
                alert(errorMessage);
                console.log(errorMessage);
            }
        });   
    }

    createAnimalsBtnClickHandler() {
        console.log(this.template.querySelector('lightning-datatable').getSelectedRows());
        createAnimals({Animals : this.template.querySelector('lightning-datatable').getSelectedRows()})
    }

}
