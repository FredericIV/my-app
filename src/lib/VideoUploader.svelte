<script>
    import { FileUploader, InlineNotification, Tile, Button, ProgressBar } from "carbon-components-svelte";
    import { createTusUpload, TusUploaded, TusTotal } from "$lib/uploadUtil.js";

	/** @type {readonly File[] | any[]} */
    $: files = [];
    /** @type {"edit" | "uploading" | "complete"} */
    $: status = "edit"
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
        value={$TusUploaded}
        max={$TusTotal}
    />
    <Button on:click="{onUpload}" disabled={!files.length||status=="complete"}>Upload</Button>
</Tile>
{#if status == "complete"}
    <InlineNotification
        kind="success"
        title="Success"
        subtitle="Your video has been uploaded."
    />
{/if}