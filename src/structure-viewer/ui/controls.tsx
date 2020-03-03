/**
 * Copyright (c) 2019-2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import * as React from 'react';
import { PluginUIComponent } from 'molstar/lib/mol-plugin-ui/base';
import { TransformUpdaterControl } from 'molstar/lib/mol-plugin-ui/state/update-transform';
import { StructureSelectionControls } from 'molstar/lib/mol-plugin-ui/structure/selection';
import { StructureRepresentationControls } from 'molstar/lib/mol-plugin-ui/structure/representation';
import { StateElements, StructureViewerState } from '../types';
import { Viewport, ViewportControls } from 'molstar/lib/mol-plugin-ui/viewport';
import { BackgroundTaskProgress } from 'molstar/lib/mol-plugin-ui/task';
import { LociLabels } from 'molstar/lib/mol-plugin-ui/controls';
import { Toasts } from 'molstar/lib/mol-plugin-ui/toast';
import { StructureControls } from './structure';
import { OpenFile } from './open';

export class ControlsWrapper extends PluginUIComponent {
    get customState() {
        return this.plugin.customState as StructureViewerState
    }

    componentDidMount() {
        this.subscribe(this.plugin.state.behavior.currentObject, () => this.forceUpdate());
        this.subscribe(this.plugin.events.state.object.updated, () => this.forceUpdate());
    }

    render() {
        const { showOpenFileControls } = this.customState.props
        return <div className='msp-scrollable-container msp-right-controls' style={{ paddingTop: '0px' }}>
            {showOpenFileControls && <OpenFile initiallyCollapsed={false} />}
            <StructureControls />
            <StructureSelectionControls header='Manage Selection' initiallyCollapsed={true} />
            <StructureRepresentationControls header='Change Representation' initiallyCollapsed={true} />
            <TransformUpdaterControl nodeRef={StateElements.VolumeStreaming} header={{ name: 'Density Controls', description: '' }} initiallyCollapsed={true} />
        </div>;
    }
}

export class ViewportWrapper extends PluginUIComponent {
    render() {
        return <>
            <Viewport />
            <ViewportControls />
            <div style={{ position: 'absolute', left: '10px', bottom: '10px' }}>
                <BackgroundTaskProgress />
            </div>
            <div className='msp-highlight-toast-wrapper'>
                <LociLabels />
                <Toasts />
            </div>
        </>;
    }
}