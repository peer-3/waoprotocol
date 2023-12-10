import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { SnapshotCreated } from "../generated/schema"
import { SnapshotCreated as SnapshotCreatedEvent } from "../generated/Contract/Contract"
import { handleSnapshotCreated } from "../src/contract"
import { createSnapshotCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let snapshotId = Bytes.fromI32(1234567890)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let repoName = "Example string value"
    let commitHash = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let htmlUrl = "Example string value"
    let description = "Example string value"
    let isPrivate = "boolean Not implemented"
    let forksCount = BigInt.fromI32(234)
    let watchersCount = BigInt.fromI32(234)
    let size = BigInt.fromI32(234)
    let hasIssues = "boolean Not implemented"
    let branches = "Example string value"
    let price = BigInt.fromI32(234)
    let newSnapshotCreatedEvent = createSnapshotCreatedEvent(
      snapshotId,
      owner,
      repoName,
      commitHash,
      timestamp,
      htmlUrl,
      description,
      isPrivate,
      forksCount,
      watchersCount,
      size,
      hasIssues,
      branches,
      price
    )
    handleSnapshotCreated(newSnapshotCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SnapshotCreated created and stored", () => {
    assert.entityCount("SnapshotCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "snapshotId",
      "1234567890"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "repoName",
      "Example string value"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "commitHash",
      "Example string value"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "htmlUrl",
      "Example string value"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "isPrivate",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "forksCount",
      "234"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "watchersCount",
      "234"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "size",
      "234"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hasIssues",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "branches",
      "Example string value"
    )
    assert.fieldEquals(
      "SnapshotCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
