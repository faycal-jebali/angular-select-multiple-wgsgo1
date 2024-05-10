import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
export interface StateGroup {
  letter: string;
  checked: boolean;
  names: string[];
}

/** @title Select with custom trigger text */
@Component({
  selector: 'select-custom-trigger-example',
  templateUrl: 'select-custom-trigger-example.html',
  styleUrls: ['select-custom-trigger-example.css'],
})
export class SelectCustomTriggerExample {
  constructor(private _formBuilder: FormBuilder) {
    setTimeout(() => {
      this.formGroup.setValue(['Alaska', 'Alabama', 'California']);
    }, 0);
    this.initForm();
  }

  initForm() {
    this.formGroup.valueChanges.pipe(first()).subscribe((data) => {
      console.log('formGroup values : ', data);
      const groupsFiltered = this.stateList.filter((item) => {
        return item.names.some((item2) => data.includes(item2.type));
      });
      console.log('formGroup groupsFiltered : ', groupsFiltered);

      groupsFiltered.forEach((group) => {
        const itemsSelected = group.names.filter((item) => {
          return data.includes(item.type);
        });
        itemsSelected.forEach((childOfGroup) => {
          console.log('formGroup childOfGroup : ', childOfGroup);
          this.toggleSelection(true, childOfGroup, group);
        });
      });

      this.states.setValue(this.formGroup.value);
    });
  }

  // stateForm: FormGroup = this._formBuilder.group({
  //   stateGroup: '',
  // });
  // toppings = new FormControl();
  isExpandCategory: boolean[] = [];
  stateRecord: any = [];
  states = new FormControl();
  formGroup = new FormControl();

  expandDocumentTypes(group: any) {
    console.log('expanding dropdown', group);
    this.isExpandCategory = [];
    this.isExpandCategory[group.letter] = !this.isExpandCategory[group.letter];
    // expand only selected parent dropdown category with that childs
  }

  toggleSelection(checked: boolean, name: any, group: any) {
    debugger;
    console.log('toggleSelection', name, checked, group);
    if (checked) {
      console.log('stastateRecordtelist', this.stateRecord);
      this.stateRecord.push(name.type);
      this.states.setValue(this.stateRecord);
      console.log('toggleselection ', this.states.value);
    } else {
      this.stateRecord = this.stateRecord.filter((x: any) => x !== name.type);
      console.log('else toggleselection', name, group, this.states.value);
      this.states.setValue(
        this.formGroup.value.filter((x: any) => x !== name.type)
      );
      console.log('after filter ', this.states.value);
      //this.states.setValue([]);
    }
    this.formGroup.setValue(this.states.value);
  }

  toggleParent(event: any, group: any) {
    debugger;
    group.checked = event.checked;
    console.log(
      'event',
      event.checked,
      'group',
      group,
      'states value',
      this.states.value
    );
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(
        ...group.names
          .filter((x: any) => !states.includes(x.type))
          .map((x: any) => x.type)
      );
    } else {
      console.log('else', states);
      group.names.forEach((x: any) => {
        if (states.indexOf(x.type) > -1) {
          states.splice(states.indexOf(x.type), 1);
        }
      });
    }
    this.states.setValue(states);
    console.log('statesvalue', this.states.value);
    if (!event.checked) {
      this.states.setValue(
        this.formGroup.value.filter((x: any) => !x.includes(group.names))
      );
      //this.states.setValue([]);
    }
    console.log('final statesvalue', this.states.value);
    this.stateRecord = this.states.value;

    this.formGroup.setValue(this.states.value);
  }

  stateList = [
    {
      letter: 'A',
      checked: false,
      names: [
        {
          id: 1,
          type: 'Alabama',
        },
        {
          id: 2,
          type: 'Alaska',
        },
        {
          id: 3,
          type: 'Arizona',
        },
        {
          id: 4,
          type: 'Arkansas',
        },
      ],
    },
    {
      letter: 'C',
      checked: false,
      names: [
        {
          id: 8,
          type: 'California',
        },
        {
          id: 9,
          type: 'Colorado',
        },
        {
          id: 10,
          type: 'Connecticut',
        },
      ],
    },
    {
      letter: 'D',
      checked: false,
      names: [
        {
          id: 18,
          type: 'Delaware',
        },
        {
          id: 19,
          type: 'Denwer',
        },
      ],
    },
  ];
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
