import {
    IPersistence,
    IPersistenceRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";

export const storeInteractionRoomData = async (
    persistence: IPersistence,
    userId: string,
    roomId: string
): Promise<void> => {
    const association = new RocketChatAssociationRecord(
        RocketChatAssociationModel.USER,
        `${userId}#RoomId`
    );
    await persistence.updateByAssociation(
        association,
        { roomId: roomId },
        true
    );
};

export const getInteractionRoomData = async (
    persistenceRead: IPersistenceRead,
    userId: string
): Promise<any> => {
    const association = new RocketChatAssociationRecord(
        RocketChatAssociationModel.USER,
        `${userId}#RoomId`
    );
    const result = (await persistenceRead.readByAssociation(
        association
    )) as Array<any>;
    return result && result.length ? result[0] : null;
};