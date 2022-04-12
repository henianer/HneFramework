import { ServiceProto } from 'tsrpc-proto';
import { MsgChat } from './msg/MsgChat';
import { ReqDBAdd, ResDBAdd } from './ptl/db/PtlDBAdd';
import { ReqDBDel, ResDBDel } from './ptl/db/PtlDBDel';
import { ReqDBGet, ResDBGet } from './ptl/db/PtlDBGet';
import { ReqDBUpdate, ResDBUpdate } from './ptl/db/PtlDBUpdate';
import { ReqSend, ResSend } from './ptl/msg/PtlSend';

export interface ServiceType {
    api: {
        "ptl/db/DBAdd": {
            req: ReqDBAdd,
            res: ResDBAdd
        },
        "ptl/db/DBDel": {
            req: ReqDBDel,
            res: ResDBDel
        },
        "ptl/db/DBGet": {
            req: ReqDBGet,
            res: ResDBGet
        },
        "ptl/db/DBUpdate": {
            req: ReqDBUpdate,
            res: ResDBUpdate
        },
        "ptl/msg/Send": {
            req: ReqSend,
            res: ResSend
        }
    },
    msg: {
        "msg/Chat": MsgChat
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 0,
            "name": "msg/Chat",
            "type": "msg"
        },
        {
            "id": 1,
            "name": "ptl/db/DBAdd",
            "type": "api"
        },
        {
            "id": 2,
            "name": "ptl/db/DBDel",
            "type": "api"
        },
        {
            "id": 3,
            "name": "ptl/db/DBGet",
            "type": "api"
        },
        {
            "id": 4,
            "name": "ptl/db/DBUpdate",
            "type": "api"
        },
        {
            "id": 5,
            "name": "ptl/msg/Send",
            "type": "api"
        }
    ],
    "types": {
        "msg/MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/TSend"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "../Post/TSend": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "ptl/db/PtlDBAdd/ReqDBAdd": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "add",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/TDBAdd"
                    }
                }
            ]
        },
        "../Post/TDBAdd": {
            "target": {
                "type": "Reference",
                "target": "../Post/IUserInfo"
            },
            "keys": [
                "account",
                "password"
            ],
            "type": "Pick"
        },
        "../Post/IUserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "headIcon",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "nickName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "introduction",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "propertyData",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "gold",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "diamond",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "ptl/db/PtlDBAdd/ResDBAdd": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "resCode",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/EResCode"
                    }
                },
                {
                    "id": 1,
                    "name": "insertedId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../Post/EResCode": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": "non-existent"
                },
                {
                    "id": 1,
                    "value": "success"
                },
                {
                    "id": 2,
                    "value": "fail"
                },
                {
                    "id": 3,
                    "value": "empty"
                }
            ]
        },
        "ptl/db/PtlDBDel/ReqDBDel": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "del",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/TDBDel"
                    }
                }
            ]
        },
        "../Post/TDBDel": {
            "target": {
                "type": "Reference",
                "target": "../Post/IUserInfo"
            },
            "keys": [
                "uid"
            ],
            "type": "Pick"
        },
        "ptl/db/PtlDBDel/ResDBDel": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "resCode",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/EResCode"
                    }
                }
            ]
        },
        "ptl/db/PtlDBGet/ReqDBGet": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "get",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/TDBGet"
                    }
                }
            ]
        },
        "../Post/TDBGet": {
            "type": "Partial",
            "target": {
                "target": {
                    "type": "Reference",
                    "target": "../Post/IUserInfo"
                },
                "keys": [
                    "account",
                    "uid",
                    "nickName"
                ],
                "type": "Pick"
            }
        },
        "ptl/db/PtlDBGet/ResDBGet": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "resCode",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/EResCode"
                    }
                },
                {
                    "id": 1,
                    "name": "userInfo",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/IUserInfo"
                    }
                }
            ]
        },
        "ptl/db/PtlDBUpdate/ReqDBUpdate": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "update",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/TDBUpdate"
                    }
                }
            ]
        },
        "../Post/TDBUpdate": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Partial",
                        "target": {
                            "target": {
                                "type": "Reference",
                                "target": "../Post/IUserInfo"
                            },
                            "keys": [
                                "account",
                                "password",
                                "nickName",
                                "introduction",
                                "propertyData"
                            ],
                            "type": "Pick"
                        }
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uid",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "ptl/db/PtlDBUpdate/ResDBUpdate": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "resCode",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/EResCode"
                    }
                }
            ]
        },
        "ptl/msg/PtlSend/ReqSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/TSend"
                    }
                }
            ]
        },
        "ptl/msg/PtlSend/ResSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "resCode",
                    "type": {
                        "type": "Reference",
                        "target": "../Post/EResCode"
                    }
                }
            ]
        }
    }
};