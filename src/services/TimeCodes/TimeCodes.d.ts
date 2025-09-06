export interface ICodes {
	startOffsetMs: number;
	endOffsetMs: number;
}

export interface ITimeCodes {
	start: ICodes;
	ending: ICodes;
	skip_credits?: ICodes;
	recap?: ICodes;
}
