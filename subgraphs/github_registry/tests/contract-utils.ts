import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { NewBuildCreated } from "../generated/Contract/Contract"

export function createNewBuildCreatedEvent(
  repository: ethereum.Tuple,
  build: ethereum.Tuple
): NewBuildCreated {
  let newBuildCreatedEvent = changetype<NewBuildCreated>(newMockEvent())

  newBuildCreatedEvent.parameters = new Array()

  newBuildCreatedEvent.parameters.push(
    new ethereum.EventParam("repository", ethereum.Value.fromTuple(repository))
  )
  newBuildCreatedEvent.parameters.push(
    new ethereum.EventParam("build", ethereum.Value.fromTuple(build))
  )

  return newBuildCreatedEvent
}
