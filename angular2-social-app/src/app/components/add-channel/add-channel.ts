import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';
import { ChannelService } from 'services';
import { SocketService } from 'app/services/SocketService';

/**
 * Add a new channel in the list
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(ModalDirective)
    modal: ModalDirective;
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = { name: '' };

    constructor(
        private channelService: ChannelService
    ) {
    }

    save() {
        if (this.ngForm.valid) {
            this.channelService.add(this.model.name);
            this.modal.hide();
        }
    }
}