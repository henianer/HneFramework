import { ServiceProto } from 'tsrpc-proto';
import { ReqAddPost, ResAddPost } from './PtlAddPost';
import { ReqDelPost, ResDelPost } from './PtlDelPost';
import { ReqGetPost, ResGetPost } from './PtlGetPost';
import { ReqUpdatePost, ResUpdatePost } from './PtlUpdatePost';

export interface ServiceType {
    api: {
        "AddPost": {
            req: ReqAddPost,
            res: ResAddPost
        },
        "DelPost": {
            req: ReqDelPost,
            res: ResDelPost
        },
        "GetPost": {
            req: ReqGetPost,
            res: ResGetPost
        },
        "UpdatePost": {
            req: ReqUpdatePost,
            res: ResUpdatePost
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 2,
            "name": "AddPost",
            "type": "api"
        },
        {
            "id": 3,
            "name": "DelPost",
            "type": "api"
        },
        {
            "id": 4,
            "name": "GetPost",
            "type": "api"
        },
        {
            "id": 5,
            "name": "UpdatePost",
            "type": "api"
        }
    ],
    "types": {
        "PtlAddPost/ReqAddPost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "add",
                    "type": {
                        "target": {
                            "type": "Reference",
                            "target": "models/Post/Post"
                        },
                        "keys": [
                            "author",
                            "content",
                            "title"
                        ],
                        "type": "Pick"
                    }
                }
            ]
        },
        "models/Post/Post": {
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
                    "name": "author",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "visitedNum",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "create",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uid",
                                "type": {
                                    "type": "String"
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
                    }
                },
                {
                    "id": 6,
                    "name": "update",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uid",
                                "type": {
                                    "type": "String"
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
                    "optional": true
                }
            ]
        },
        "PtlAddPost/ResAddPost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "insertedId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlDelPost/ReqDelPost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlDelPost/ResDelPost": {
            "type": "Interface"
        },
        "PtlGetPost/ReqGetPost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetPost/ResGetPost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "post",
                    "type": {
                        "type": "Reference",
                        "target": "models/Post/Post"
                    }
                }
            ]
        },
        "PtlUpdatePost/ReqUpdatePost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "update",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Partial",
                                    "target": {
                                        "target": {
                                            "type": "Reference",
                                            "target": "models/Post/Post"
                                        },
                                        "keys": [
                                            "title",
                                            "content"
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
                                            "name": "_id",
                                            "type": {
                                                "type": "String"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "PtlUpdatePost/ResUpdatePost": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "matchedCount",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        }
    }
};