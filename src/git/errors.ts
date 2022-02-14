export const enum StashApplyErrorReason {
	WorkingChanges = 1,
}

export class StashApplyError extends Error {
	readonly original?: Error;
	readonly reason: StashApplyErrorReason | undefined;

	constructor(reason?: StashApplyErrorReason, original?: Error);
	constructor(message?: string, original?: Error);
	constructor(messageOrReason: string | StashApplyErrorReason | undefined, original?: Error) {
		let message;
		let reason: StashApplyErrorReason | undefined;
		if (messageOrReason == null) {
			message = 'Unable to apply stash';
		} else if (typeof messageOrReason === 'string') {
			message = messageOrReason;
			reason = undefined;
		} else {
			reason = messageOrReason;
			message =
				'Unable to apply stash. Your working tree changes would be overwritten. Please commit or stash your changes before trying again';
		}
		super(message);

		this.original = original;
		this.reason = reason;
		Error.captureStackTrace?.(this, StashApplyError);
	}
}

export const enum WorktreeCreateErrorReason {
	AlreadyCheckedOut = 1,
	AlreadyExists = 2,
}

export class WorktreeCreateError extends Error {
	readonly original?: Error;
	readonly reason: WorktreeCreateErrorReason | undefined;

	constructor(reason?: WorktreeCreateErrorReason, original?: Error);
	constructor(message?: string, original?: Error);
	constructor(messageOrReason: string | WorktreeCreateErrorReason | undefined, original?: Error) {
		let message;
		let reason: WorktreeCreateErrorReason | undefined;
		if (messageOrReason == null) {
			message = 'Unable to create worktree';
		} else if (typeof messageOrReason === 'string') {
			message = messageOrReason;
			reason = undefined;
		} else {
			reason = messageOrReason;
			switch (reason) {
				case WorktreeCreateErrorReason.AlreadyCheckedOut:
					message = 'Unable to create worktree because it is already checked out';
					break;
				case WorktreeCreateErrorReason.AlreadyExists:
					message = 'Unable to create worktree because it already exists';
					break;
			}
		}
		super(message);

		this.original = original;
		this.reason = reason;
		Error.captureStackTrace?.(this, WorktreeCreateError);
	}
}

export const enum WorktreeDeleteErrorReason {
	HasChanges = 1,
}

export class WorktreeDeleteError extends Error {
	readonly original?: Error;
	readonly reason: WorktreeDeleteErrorReason | undefined;

	constructor(reason?: WorktreeDeleteErrorReason, original?: Error);
	constructor(message?: string, original?: Error);
	constructor(messageOrReason: string | WorktreeDeleteErrorReason | undefined, original?: Error) {
		let message;
		let reason: WorktreeDeleteErrorReason | undefined;
		if (messageOrReason == null) {
			message = 'Unable to delete worktree';
		} else if (typeof messageOrReason === 'string') {
			message = messageOrReason;
			reason = undefined;
		} else {
			reason = messageOrReason;
			if (reason === WorktreeDeleteErrorReason.HasChanges) {
				message = 'Unable to delete worktree because there are uncommitted changes';
			}
		}
		super(message);

		this.original = original;
		this.reason = reason;
		Error.captureStackTrace?.(this, WorktreeDeleteError);
	}
}
