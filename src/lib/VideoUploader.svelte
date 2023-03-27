<script>
    import { createEventDispatcher } from 'svelte';
    import {
        FileUploader,
        Tile,
        Button,
        ButtonSet,
        ProgressBar 
    } from "carbon-components-svelte";

    import {
        createTusUpload,
        TusUploaded,
        TusTotal
    } from "$lib/uploadUtil.js";

	/** @type {readonly File[] | any[]} */
    let files = [];
    /** @type {"edit" | "uploading" | "complete"} */
    export let status = "edit"
    let fileUploader;

    async function onUpload() {
        if (!files.length) return;
        status = "uploading";
        await createTusUpload(files[0]);
        status = "complete";
    }
    function onChange() {
        if (status == "complete") {
            status = "edit";
            $TusUploaded = 0;
        }
    }
    const dispatch = createEventDispatcher();
    function onComplete() {
        dispatch('onComplete');
    }
    $: helperText = status ==="complete"?"Done":$TusUploaded > 0 ? ($TusUploaded/1024/1024).toFixed(1) + "MB of " + ($TusTotal/1024/1024).toFixed(1) + "MB" : "Select a file and press Upload to start";
</script>
<Tile>
    <FileUploader
        bind:this={fileUploader}
        accept={["video/*"]}
        labelTitle="Upload a video"
        buttonLabel="Browse"
        kind="ghost"
        bind:status
        bind:files
        on:change="{onChange}"
    />
    <ProgressBar
        labelText="Upload progress"
        value={$TusUploaded}
        max={$TusTotal}
        status={status=="complete"?"finished":"active"}
        {helperText}
    />
    
</Tile>
<ButtonSet>
    <Button kind="secondary" on:click="{onUpload}" disabled={!files.length||status!="edit"}>Upload</Button>
    <Button on:click="{onComplete}" disabled={status!="complete"}>Continue</Button>
</ButtonSet>